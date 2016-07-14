'use strict';

const gulp = require('gulp');
const del = require('del');

gulp.task('clean', () => del(['coverage', 'test/**/*.js', 'test/**/*.js.map']));
