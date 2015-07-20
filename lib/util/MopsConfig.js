'use strict';

var os = require('os');
var fs = require('fs');
var nconf = require('nconf');

function getDefaultFilename() {
    return /^win/.test(os.platform()) ?
           '%HOME%/_mops_config.json' :
           '~/.mops_config.json';
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

MopsConfig.prototype.save = function() {
    nconf.save(function(err) {
        // TODO errors
        console.log(err);
    });
};

module.exports = MopsConfig;
