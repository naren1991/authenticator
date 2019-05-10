const rabbitmqConfig = require('../config/rabbitmq.config.js')
const comms = require('../comms.js')

exports.onSuccessfulAuth = function(res){
    comms.reply(amqpChannel, res)
    console.log("replied", res)
}
