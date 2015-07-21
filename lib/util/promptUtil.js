'use strict';

var prompt = require('prompt');
var q = require('q');

module.exports = {

    getRequiredFields: function(schema, program) {
        var attrs = {};
        var deferred = q.defer();
        var properties = Object.keys(schema.properties);

        // remove any fields we have
        properties.forEach(function(property) {
            if (program[property]) {
                attrs[property] = program[property];
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
                    attrs[property] = result[property];
                });
                deferred.resolve(attrs);
            });
        } else {
            deferred.resolve(attrs);
        }
        return deferred.promise;
    }

};
