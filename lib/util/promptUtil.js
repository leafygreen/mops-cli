'use strict';

var prompt = require('prompt');
var q = require('q');

module.exports = {

    getRequiredOptions: function(schema, cliOptions, mopsConfig) {
        var options = {};
        var deferred = q.defer();
        var properties = Object.keys(schema.properties);

        // remove any fields we have from the cli
        properties.forEach(function(property) {
            if (cliOptions[property]) {
                options[property] = cliOptions[property];
                delete schema.properties[property];
            }
        });

        // merge in any fields we have from MopsConfig
        properties = Object.keys(schema.properties);
        properties.forEach(function(property) {
            var value = mopsConfig.get(property);
            if (value) {
                options[property] = value;
                delete schema.properties[property];
            }
        });

        properties = Object.keys(schema.properties);
        if (properties.length) {
            // prompt for missing fields
            prompt.start();
            prompt.get(schema, function(err, result) {
                if (err) {
                    deferred.reject(err);
                }

                // copy received fields to existing fields
                var resultProperties = Object.keys(result);
                resultProperties.forEach(function(property) {
                    options[property] = result[property];
                });
                deferred.resolve(options);
            });
        } else {
            deferred.resolve(options);
        }
        return deferred.promise;
    }

};
