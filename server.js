const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport')

// create express app
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server is listening on port 3000");
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message": "Welcome to the the set of web services to authenticate" +
    " users through 3rd parties"});
});

module.exports = app;

const googleRouter = require('./api/routes/google.route.js');
app.use('/authenticate', googleRouter);


const comms = require('./comms/comms.js')
const rabbitmqConfig = require('./comms/config/rabbitmq.config.js')

global.amqpConn = comms.init();
amqpConn.then(function(conn){
    return conn.createChannel();
}).then(function(ch) {
    global.amqpChannel = ch
    ch.checkQueue(rabbitmqConfig.authQueue).then(function(ok) {
        comms.consume(ch, rabbitmqConfig.authQueue)
        console.log("Queue exists")
    });
}).catch(console.warn);