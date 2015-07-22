'use strict';

var fs = require('fs');
var childProcess = require('child_process');
var q = require('q');
var tmp = require('tmp');

module.exports = {

    openJSONInEditor: function(json) {
        var deferred = q.defer();
        var tmpobj = tmp.fileSync();

        // write to temp file
        fs.writeFileSync(tmpobj.name, JSON.stringify(json, null, 4));

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
                var editedJSON = fs.readFileSync(tmpobj.name);
                deferred.resolve(editedJSON);
            } else {
                deferred.reject('Editor process exited with code ' + code);
            }
        });

        return deferred.promise;
    }

};
