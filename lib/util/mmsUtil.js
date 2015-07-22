'use strict';

var MMS = require('node-mms-client');

module.exports = {

    getClient: function(mopsConfig) {
        var user = mopsConfig.get('user');
        var apiKey = mopsConfig.get('apiKey');
        var host = mopsConfig.get('host');
        var port = mopsConfig.get('port');

        if (!user || !apiKey || !host || !port) {
            console.error('Please store credentials with the `mops login` command');
            System.exit(1);
        }

        return new MMS({
            username: user,
            apiKey: apiKey,
            host: host,
            port: port
        });
    }
}
