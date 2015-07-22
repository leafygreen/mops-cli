'use strict';

var MMS = require('node-mms-client');

module.exports = {

    getClient: function(mopsConfig) {
        var user = mopsConfig.get('user');
        var apiKey = mopsConfig.get('apiKey');
        var host = mopsConfig.get('host');

        if (!user || !apiKey || !host) {
            console.error('Please store credentials with the `mops login` command');
            System.exit(1);
        }

        return new MMS({
            username: user,
            apiKey: apiKey,
            host: host
        });
    }
}
