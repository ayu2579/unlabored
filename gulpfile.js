const gulp = require('gulp');

gulp.task('lint:app', () => {
  const eslint = require('gulp-eslint');

  return gulp.src('app/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('lint:server', () => {
  const eslint = require('gulp-eslint');

  return gulp.src(['models/**/*js', 'routers/**/*.js', 'index.js'])
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
  gulp.watch('app/**/*.js', ['lint:app']);
  gulp.watch(['models/**/*js', 'routers/**/*.js', 'index.js'] ['lint:server']);
  gulp.watch('styles/**/*.scss', ['style']);
});

gulp.task('default', ['style', 'lint:app', 'lint:server', 'watch']);
