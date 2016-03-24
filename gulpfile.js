var gulp = require('gulp');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var htmlmin = require('gulp-htmlmin');
var angularTemplateCache = require('gulp-angular-templatecache');
var gutil = require('gulp-util');
var addStream = require('add-stream');

function prepareTemplates() {
  return gulp.src('./client/app/**/*.tpl.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(angularTemplateCache());
}

gulp.task('app', function() {
  return gulp.src('./client/app/**/*.js')
    .pipe(addStream.obj(prepareTemplates()))
    .pipe(concat('app.js'))
    .pipe(gutil.env.type === 'production' ? ngAnnotate() : gutil.noop())
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(gulp.dest('./dist'));
});

gulp.task('assets', function() {
  return gulp.src('./client/assets/**/*')
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('watch', function(){
  gulp.watch(['./client/app/**/*.js', './client/app/**/*.tpl.html'], ['app']);
  gulp.watch('./client/assets/**/*', ['assets']);
});

gulp.task('nodemon', function() {
  return nodemon({
    script: './server/bin/www',
    ext: 'js',
    ignore: [
      'client/',
      'node_modules/'
    ],
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('default', [
  'assets',
  'app',
  'watch',
  'nodemon'
]);
