const gulp = require('gulp');

gulp.task('lint', () => {
  const eslint = require('gulp-eslint');

  return gulp.src('app/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('watch', () => {
  gulp.watch('app/**/*.js', ['lint']);
});

gulp.task('default', ['lint', 'watch']);
