import gulp from 'gulp';
import sequence from 'gulp-sequence';


gulp.task('coverage', sequence('clean', 'ts', 'karma-coverage'));
