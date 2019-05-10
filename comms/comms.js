const amqp = require('amqplib/callback_api');
const amqplib = require('amqplib')
const rabbitmqConfig = require('./config/rabbitmq.config.js')

//TODO: Error handling
exports.init = function() {
  //var amqpConn = amqp.createConnection(rabbitmqConfig.opt);
  var amqpConn = amqplib.connect(rabbitmqConfig.url, rabbitmqConfig.opt)
  /* amqp.connect(rabbitmqConfig.url + "?heartbeat=60", rabbitmqConfig.opt, function(err, conn) {
     //console.log(conn)
      if (err) {
        console.error("[AMQP]", err.message);
        return setTimeout(start, 1000);
      }
      conn.on("error", function(err) {
        if (err.message !== "Connection closing") {
          console.error("[AMQP] conn error", err.message);
        }
      });
      conn.on("close", function() {
        console.error("[AMQP] reconnecting");
        return setTimeout(start, 1000);
      });
      console.log("[AMQP] connected");
      amqpConn = conn;
      //whenConnected();
    });*/ 
    //console.log(amqpConn)
    if(amqpConn){
      console.log("[AMQP] connected");
      //whenConnected(amqpConn)
    }
    return Promise.resolve(amqpConn);
}

const googleTask = require('../tasks/auth-google.task.js');
const authConsumer = require('./consumers/auth.consumers.js');

exports.consume = function(channel, queue) {
    try {
      conChannel = channel
      conChannel.consume(queue, (msg) => {

        ///////////////////////////////////////////////////////////////////
        //TODO: Check for which type of auth. Now only google.
        //TODO: This flow needs to be clear: API vs messaging. Both should be possible

        //This is for testing
        var res = googleTask.authenticate(msg)
        res = googleTask.callback(res)
        if(res){
          authConsumer.onSuccessfulAuth(res);
        }
        
        ///////////////////////////////////////////////////////////////////
        
        //TODO: Error handling
      })
    } catch (e) {
      console.error("[AMQP] consume", e.message);
    }
  }

  exports.reply = function(channel, msg){
    
    //content = new Buffer(JSON.stringify(msg.content))
    content = msg.content
    channel.sendToQueue(msg.properties.replyTo, content, {
      correlationId: msg.properties.correlationId
    });
    //console.log("reply complete")
    //Acknowledge the job done with the message.
    channel.ack(msg);
  }

/*
var pubChannel = null;
var offlinePubQueue = [];

startPublisher = function (amqpConn) {
  if(amqpConn){
    amqpConn.createChannel(function(err, ch) {
      if (closeOnErr(err)) return;
        ch.on("error", function(err) {
        console.error("[AMQP] channel error", err.message);
      });
      ch.on("close", function() {
        console.log("[AMQP] channel closed");
      });
  
      ch.consume('amq.rabbitmq.reply-to', msg => eventEmitter.emit(msg.properties.correlationId, msg.content))
      
      pubChannel = ch;
      
      while (true) {
        var [exchange, routingKey, content] = offlinePubQueue.shift();
        exports.publish(exchange, routingKey, content);
        console.log("Publisher started")
      }
    });
  }
  
    
 
}

*/

