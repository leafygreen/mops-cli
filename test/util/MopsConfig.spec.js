'use strict';

var expect = require('chai').expect;

var MopsConfig = require('../../lib/util/MopsConfig');

describe('util/MopsConfig', function() {

    describe('when reading a test config file', function() {
        var config;
        beforeEach(function() {
            config = new MopsConfig('./test/util/config.json');
        });

        it('contains username', function() {
            var username = config.get('username');
            expect(username).to.equal('myUsername');
        });
    });

});
