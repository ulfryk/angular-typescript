'use strict';

import gulp from 'gulp';

import ts from 'gulp-typescript';
import tslint from 'gulp-tslint';
import sourceMaps from 'gulp-sourcemaps';

var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts-build', function () {
  return gulp.src(['**/*.ts', 'typings/**/*.d.ts', '!node_modules/**/*.ts'])
    .pipe(sourceMaps.init())
    .pipe(ts(tsProject))
    .pipe(sourceMaps.write('', {
      sourceRoot: ' ',
      mapSources: (destPath) => '../' + destPath
    }))
    .pipe(gulp.dest(''));
});

gulp.task('ts-lint', function () {
  return gulp.src(['src/**/*.ts', 'test/**/*.ts'])
    .pipe(tslint({configuration: 'tslint.json'}))
    .pipe(tslint.report({emitError: false}));
});

gulp.task('ts', ['ts-lint', 'ts-build']);

gulp.task('watch', ['ts'], function() {
  gulp.watch(['src/**/*.ts', 'test/**/*.ts'], ['ts']);
});
