'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

require('require-dir')('./gulp/');

/*
 * emulate ci locally
 */
gulp.task('default', function (done) {
    runSequence('ts', 'karma-ci-short', done);
});

/*
 * ci
 */
gulp.task('ci', function (done) {
    runSequence('ts', 'karma-ci', done);
});
