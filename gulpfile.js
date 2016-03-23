var gulp = require('gulp');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var fs = require('fs');

gulp.task('app', function() {
  return gulp.src('./client/app/**/*.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('app-dev', function() {
  return gulp.src('./client/app/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('assets', function() {
  return gulp.src('./client/assets/**/*')
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('watch-app', function(){
  return gulp.watch('./client/app/*.js', ['app-dev']);
});

gulp.task('watch-assets', function(){
  return gulp.watch('./client/assets/**/*', ['assets']);
});

gulp.task('nodemon', function() {
  return nodemon({
    script: './server/bin/www',
    ext: 'js',
    ignore: [
      'client/',
      'node_modules/',
      'bower_components/'
    ]
  })
});

gulp.task('nodemon-dev', function() {
  return nodemon({
    script: './server/bin/www',
    ext: 'js',
    ignore: [
      'client/',
      'node_modules/',
      'bower_components/'
    ],
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('watch', ['watch-assets', 'watch-app']);

gulp.task('dev', ['assets', 'app-dev', 'watch', 'nodemon']);
gulp.task('prod', ['assets', 'app', 'nodemon']);
gulp.task('default', ['dev']);
