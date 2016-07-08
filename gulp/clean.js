'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('clean', () => del(['bower_components', 'dist', 'coverage']));
