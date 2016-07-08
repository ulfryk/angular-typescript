'use strict';

import gulp from 'gulp';

import sequence from 'gulp-sequence';
import tsc from 'gulp-tsc';
import tslint from 'gulp-tslint';

gulp.task('ts-build', function () {
  return gulp.src(['at-*.ts', 'test/**/*.ts', 'typings/**/*.d.ts'])
    .pipe(tsc({
      declarationFiles: false,
      experimentalDecorators: true,
      noExternalResolve: true,
      target: 'ES5',
      module: 'umd',
      sourceMap: true,
      emitError: false
    }))
    .pipe(gulp.dest('dist/'));
});
gulp.task('ts-lint', function () {
  return gulp.src(['at-*.ts', 'test/**/*.ts'])
    .pipe(tslint({configuration: {rules: require('../tslint.json')}}))
    .pipe(tslint.report('verbose'));
});

gulp.task('ts', sequence(['ts-lint', 'ts-build']));
