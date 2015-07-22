'use strict';

var os = require('os');
var nconf = require('nconf');

function getDefaultFilename() {
    return /^win/.test(os.platform()) ?
           process.env.HOME + '/_mops_config.json' :
           process.env.HOME + '/.mops_config.json';
}

function MopsConfig(filename) {
    this.filename = filename || getDefaultFilename();
    nconf.file(this.filename);
}

MopsConfig.prototype.set = function(key, value) {
    return nconf.set(key, value);
};

MopsConfig.prototype.get = function(key) {
    return nconf.get(key);
};

MopsConfig.prototype.save = function(callback) {
    nconf.save(function(err) {
        if (err) {
            callback(err);
        } else {
            callback();
        }
    });
};

module.exports = MopsConfig;
