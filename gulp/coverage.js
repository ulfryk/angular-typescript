var gulp = require('gulp');
var sequence = require('gulp-sequence');


gulp.task('coverage', sequence('clean', 'ts', 'karma-coverage'));
