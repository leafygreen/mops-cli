'use strict';

var expect = require('chai').expect;

var MetricsWriter = require('../../lib/util/MetricsWriter');

describe('util/MetricsWriter', function() {
    var writer;
    beforeEach(function() {
        writer = new MetricsWriter();
    });

    describe('when seeded with two metrics responses', function() {
        beforeEach(function() {
            writer.addMetric({
                dataPoints: [
                    { timestamp: '2015-07-20T17:49:00Z', value: 1 },
                    { timestamp: '2015-07-20T17:50:00Z', value: 2 },
                    { timestamp: '2015-07-20T17:52:00Z', value: 4 }
                ],
                granularity: 'MINUTE',
                metricName: 'DB_DATA_SIZE_TOTAL',
                units: 'BYTES'
            });
            writer.addMetric({
                dataPoints: [
                    { timestamp: '2015-07-20T17:48:00Z', value: 0 },
                    { timestamp: '2015-07-20T17:50:00Z', value: 2 },
                    { timestamp: '2015-07-20T17:51:00Z', value: 3 }
                ],
                granularity: 'MINUTE',
                metricName: 'DB_STORAGE_TOTAL',
                units: 'BYTES'
            });
        });

        describe('when outputting csv', function() {
            var csv;
            beforeEach(function() {
                csv = writer.writeCSV();
            });

            it('contains 6 lines (header + 5 timestamps)', function() {
                var lines = csv.split(/\n/);
                expect(lines.length).to.equal(6);
            });

            it('each line contains 3 columns (date + 2 metrics)', function() {
                var lines = csv.split(/\n/);
                lines.forEach(function(line) {
                    expect(line.split(',').length).to.equal(3);
                });
            });
        });
    });

});
