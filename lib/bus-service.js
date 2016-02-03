var events = require('events');
var util = require('util');
var nsq = require('nsqjs');

function Bus(options) {
    var bus = this;
    events.EventEmitter.call(this);

    var exampleReader = new nsq.Reader('TOPIC-NAME', 'CHANEL-NAME', options);

    exampleReader.connect();
    exampleReader.on('message', function (message) {
        var e = {
            entity: message.json(),
            message: message
        };

        bus.emit('EVENT-NAME', e);
    });

    exampleReader.on('error', function(err){
        console.log('Event: error');
    });
    exampleReader.on('discard', function(err){
        console.log('Event: discard');
    });
    exampleReader.on('nsqd_closed', function(err){
        console.log('Event: nsqd_closed');
    });
    exampleReader.on('nsqd_connected', function(err){
        console.log('Event: nsqd_connected');
    });

}

util.inherits(Bus, events.EventEmitter);

module.exports = Bus;