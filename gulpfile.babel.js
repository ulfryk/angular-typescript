'use strict';

import gulp from "gulp";
import sequence from 'gulp-sequence';

require('require-dir')('./gulp/');

/*
 * emulate ci locally
 */
gulp.task('default', sequence('ts', 'karma-ci-short'));

/*
 * ci
 */
gulp.task('ci', sequence('ts', 'karma-ci'));
