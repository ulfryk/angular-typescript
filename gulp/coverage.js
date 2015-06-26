'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('coverage', function (done) {
    runSequence(
        'clean-tmp',
        'ts',
        'karma-coverage',
        done
    );
});