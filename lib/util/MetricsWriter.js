'use strict';

function MetricsWriter() {
    this.metrics = {};
}

/* Add metric
    {
        dataPoints: [
            { timestamp: '2015-07-20T17:48:00Z', value: 0 }
            { timestamp: '2015-07-20T17:50:00Z', value: 2 }
            { timestamp: '2015-07-20T17:51:00Z', value: 3 }
        ],
        granularity: 'MINUTE',
        metricName: 'DB_STORAGE_TOTAL',
        units: 'BYTES'
    }
*/
MetricsWriter.prototype.addMetric = function(metric) {
    this.metrics[metric.metricName] = metric;
};

MetricsWriter.prototype.writeCSV = function() {
    var metricNames = Object.keys(this.metrics).sort();
    var granularity;
    var minTimestamp;
    var maxTimestamp;

    // get granularity and min and max timestamps
    metricNames.forEach(function(metricName) {
        var metric = this.metrics[metricName];
        var dataPoints = metric.dataPoints;
        granularity = metric.granularity;
        if (dataPoints.length) {
            var firstTimestamp = new Date(dataPoints[0].timestamp).getTime();
            if (minTimestamp) {
                if (minTimestamp > firstTimestamp) {
                    minTimestamp = firstTimestamp;
                }
            } else {
                minTimestamp = firstTimestamp;
            }

            var lastTimestamp = new Date(dataPoints[dataPoints.length-1].timestamp).getTime();
            if (maxTimestamp) {
                if (maxTimestamp < lastTimestamp) {
                    maxTimestamp = lastTimestamp;
                }
            } else {
                maxTimestamp = lastTimestamp;
            }
        }
    }.bind(this));

    // add header
    var header = 'Date,'+metricNames.join(',');
    var rows = [header];

    // build time range
    var increment = 60000;  // one minute -- TODO granularity
    var timeRange = [];
    var minTime = new Date(minTimestamp).getTime();
    var maxTime = new Date(maxTimestamp).getTime();
    var currentTime = minTime;
    while(currentTime <= maxTime) {
        timeRange.push(currentTime);
        currentTime += increment;
    }


    // expand data point arrays with missing entries
    metricNames.forEach(function(metricName) {
        var metric = this.metrics[metricName];
        var dataPoints = metric.dataPoints;
        var expandedPoints = [];
        var i = 0;
        var j = 0;
        var dataPoint;
        for (i = 0; i < timeRange.length; i++) {
            if (j < dataPoints.length) {
                dataPoint = dataPoints[j];
            } else {
                dataPoint = null;
            }
            if (dataPoint) {
                dataPoint.timestamp = new Date(dataPoint.timestamp).getTime();
                if (dataPoint.timestamp === timeRange[i]) {
                    expandedPoints.push(dataPoint);
                    j++;
                } else {
                    expandedPoints.push({
                        timestamp: timeRange[i],
                        value: null
                    });
                }
            } else {
                expandedPoints.push({
                    timestamp: timeRange[i],
                    value: null
                });
            }
        }
        metric.dataPoints = expandedPoints;
    }.bind(this));

    // zip
    timeRange.forEach(function(currentTime, index) {
        var columns = [new Date(currentTime).toISOString()];
        metricNames.forEach(function(metricName) {
            var metric = this.metrics[metricName];
            var dataPoint = metric.dataPoints[index];
            columns.push(dataPoint.value);
        }.bind(this));
        rows.push(columns.join(','));
    }.bind(this));

    return rows.join('\n');
};

module.exports = MetricsWriter;
