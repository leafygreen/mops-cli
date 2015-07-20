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

        describe('when attempting to update', function() {
            afterEach(function() {
                config.set('username', 'myUsername');
                config.set('secondField', undefined);
            });

            it('can add a new property', function() {
                config.set('secondField', true);
                expect(config.get('secondField')).to.be.true;
            });

            it('can update existing property', function() {
                config.set('username', 'myOtherUsername');
                expect(config.get('username')).to.equal('myOtherUsername');
            });
        });
    });

});
