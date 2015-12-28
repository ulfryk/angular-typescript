'use strict';

var gulp = require('gulp');

var config = __dirname + '/karma.conf.js';
var Server = require('karma').Server;
var runSequence = require('run-sequence');

gulp.task('karma-tdd', function (done) {
    return new Server({
        configFile: config,
        coverageReporter: {
            type : 'html',
            dir : '../.tmp/coverage/'
        },
        browsers: ['Chrome']
    }, done).start();
});

gulp.task('karma-ci', function (done) {
    return new Server({
        configFile: config,
        coverageReporter: {
            type: 'lcov',
            subdir: 'lcov',
            dir: '../coverage/'
        },
        singleRun: true,
        autoWatch: false
    }, done).start();
});

gulp.task('karma-ci-short', function (done) {
    return new Server({
        configFile: config,
        coverageReporter: {type : 'text-summary'},
        singleRun: true,
        autoWatch: false
    }, done).start();
});

gulp.task('karma-coverage', function (done) {
    return new Server({
        configFile: config,
        coverageReporter: {
            type : 'html',
            dir : '../.tmp/coverage/'
        },
        singleRun: true,
        autoWatch: false
    }, done).start();
});


gulp.task('coverage', function (done) {
    runSequence(
        'clean-tmp',
        'ts',
        'karma-coverage',
        done
    );
});