'use strict';

var gulp = require('gulp');
var del = require('del');

gulp.task('clean-tmp', function(done) {
    del(['.tmp/'], done);
});

gulp.task('clean-bower', function (done) {
    del('bower_components', done);
});

gulp.task('clean', ['clean-tmp', 'clean-bower']);
