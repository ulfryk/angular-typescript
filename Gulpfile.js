'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

require('require-dir')('./gulp/');

/**
 * emulate jenkins locally
 */
gulp.task('default', function (done) {
    runSequence('ts-lint', 'ts-build', 'karma-ci-short', done);
});
