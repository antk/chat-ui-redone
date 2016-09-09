var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var del = require('del');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var gulpReplace = require('gulp-replace');
var vinylPaths = require('vinyl-paths');

/** dev tasks **/

gulp.task('sass', function() {
  return gulp.src('app/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(connect.reload())
});

gulp.task('html-reload', function() {
  gulp.src('app/**/*.html')
    .pipe(connect.reload())
});

gulp.task('js-reload', function() {
  gulp.src('app/**/*.js')
    .pipe(connect.reload())
})

gulp.task('watch', function() {
  gulp.watch('app/assets/scss/**/*.scss', ['sass']);
  gulp.watch('app/**/*.html', ['html-reload']);
  gulp.watch('app/**/*.js', ['js-reload']);
});

gulp.task('connect', function() {
  connect.server({
    root: ['app'],
    livereload: true,
    port: 8000,
    middleware: function(connect) {
      return [connect().use('/bower_components', connect.static('bower_components'))];
    }
  });
});

gulp.task('serve:dev', ['connect', 'sass', 'watch']);

/** end dev tasks **/

/** build production tasks **/

gulp.task('build:clean', function(cb) {
  return del(['dist'], cb);
})

// compile scss into css and copy to dist/assets
gulp.task('build:css', ['sass'], function() {
  return gulp.src('app/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/assets/css'));
});

// copy all angular related files to dist
gulp.task('build:angular', function() {
  return gulp.src(['app/**/!(*.scss|*.log|*_test.js)', '!app/{assets,assets/**}']).pipe(gulp.dest('./dist'));
});

// copy bower_components to dist
gulp.task('build:bower', function() {
  return gulp.src(['bower_components/**/*']).pipe(gulp.dest('./dist/bower_components'));
});

// concat and minify css and js references (refer to index.html for output location - currently dist/(css|js))
gulp.task('build:useref', function() {
  return gulp.src('dist/*.html')
    .pipe(gulpReplace('bower_components', '../bower_components'))
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// delete all references after concat and minification, keep it tight
gulp.task('build:clean-refs', function() {
  return gulp.src(['dist/assets', 'dist/**/*.js', 'dist/bower_components', 'dist/components', '!dist/js/*.js'])
    .pipe(vinylPaths(del));
});

// run all build related tasks
gulp.task('build', function(cb) {
  runSequence('build:clean', ['build:css', 'build:angular', 'build:bower'], 'build:useref', 'build:clean-refs', cb);
});

gulp.task('serve:prod', ['build'], function() {
  connect.server({
    root: ['dist'],
    port: 9000
  });
});

