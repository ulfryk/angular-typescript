'use strict';

var gulp = require('gulp');

var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');

gulp.task('ts-build', function () {
    return gulp.src(['at-*.ts', 'ts/**/*.d.ts', 'test/**/*.ts']).pipe(ts({
        declarationFiles: false,
        experimentalDecorators: true,
        noExternalResolve: true,
        target: 'ES5',
        typescript: require('typescript')
    })).js.on('error', function (e) {
        throw e;
    }).pipe(gulp.dest('.tmp/'));
});

gulp.task('ts-lint', function () {
    return gulp.src(['at-*.ts', 'test/**/*.ts'])
        .pipe(tslint({configuration: {rules: require('../ts/tslint.json')}}))
        .pipe(tslint.report('verbose'));
});

gulp.task('ts', function (done) {
    runSequence('ts-lint', 'ts-build', done);
});