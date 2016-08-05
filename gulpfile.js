const gulp = require('gulp');

gulp.task('lint', () => {
  const eslint = require('gulp-eslint');

  return gulp.src('**/*.js')
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('style', function () {
  const sass = require('gulp-sass');
  const plumber = require('gulp-plumber');
  const minifier = require('gulp-minify-css');
  const sourcemaps = require('gulp-sourcemaps');
  const includePaths = require('node-bourbon').includePaths;

  return gulp.src('styles/**/*.scss')
  .pipe(plumber({ errorHandler: (err) => { console.log(err); this.emit('end'); } }))
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'compressed', includePaths: includePaths }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', () => {
  gulp.watch('**/*.js', ['lint']);
  gulp.watch('styles/**/*.scss', ['style']);
});

gulp.task('default', ['style', 'lint', 'watch']);
