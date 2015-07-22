'use strict';

var fs = require('fs');
var childProcess = require('child_process');
var crypto = require('crypto');
var q = require('q');
var tmp = require('tmp');

module.exports = {

    openJSONInEditor: function(json) {
        function checksum (str) {
            return crypto
                .createHash('md5')
                .update(str, 'utf8')
                .digest('hex')
        }

        var deferred = q.defer();
        var tmpobj = tmp.fileSync();
        var jsonString = JSON.stringify(json, null, 4)
        var md5 = checksum(jsonString);

        // write to temp file
        fs.writeFileSync(tmpobj.name, jsonString);

        // attempt to open editor
        if (!process.env.EDITOR) {
            deferred.reject('EDITOR environment variable must be specified');
        }
        var editorPath = process.env.EDITOR + ' ' + tmpobj.name;
        var editor = childProcess.exec(editorPath, function (err) {
            if (err) {
                deferred.reject('Error executing ' + editorPath);
            }
        });

        // wait for editor to close and resolve if exit code is 0
        editor.on('exit', function (code) {
            if (code === 0) {
                var editedJSON = JSON.parse(
                    fs.readFileSync(tmpobj.name)
                );
                if (checksum(JSON.stringify(editedJSON, null, 4)) !== md5) {
                    deferred.resolve(editedJSON);
                } else {
                    deferred.reject('Data not changed');
                }
            } else {
                deferred.reject('Editor process exited with code ' + code);
            }
        });

        return deferred.promise;
    }

};
