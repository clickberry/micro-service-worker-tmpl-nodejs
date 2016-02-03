var debug = require('debug')('clickberry:STUB:worker');
var mongoose = require('mongoose');
var moment = require('moment');
var config = require('clickberry-config');
var Bus = require('./lib/bus-service');
var Entity = require('./models/entity');

var bus = new Bus({
    lookupdHTTPAddresses: config.get('nsqlookupd:addresses').split(','),
    maxAttempts: 5
});

var options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    }
};
mongoose.connect(config.get('mongodb:connection'), options);

bus.on('EVENT-NAME', function (e) {

});

debug('Listening for messages...');