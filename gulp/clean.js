'use strict';

import gulp from 'gulp';
import del from 'del';

gulp.task('clean', () =>
  del(['coverage', 'src/**/*.js*', 'test/**/*.js*']));
