const gulp = require('gulp'),
connect = require('gulp-connect-php'),
browserSync = require('browser-sync'),
sass = require('gulp-sass'),
imagemin = require('gulp-imagemin'),
browserify = require('browserify'),
babelify = require('babelify'),
source = require('vinyl-source-stream'),
buffer = require('vinyl-buffer');

// Development Tasks 
// -----------------

gulp.task('connect-sync', function() {
  connect.server({}, function () {
    browserSync({ proxy: '127.0.0.1:8000' });
  });

  gulp.watch('application/views/**/*.php').on('change', function() {
    browserSync.reload();
  });
});

gulp.task('sass', function() {
  return gulp.src('assets/styles/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('assets/styles/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
});

gulp.task('browserify', function() {
  return browserify({ entries: './assets/scripts/src/index.js', extensions: ['.js'], debug: true })
    .transform(babelify.configure({
      presets: ['@babel/env']
    }))
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('assets/scripts/dist/'))
    .pipe(buffer())
});

gulp.task('minify', function() {
  gulp.src('assets/images/src/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/images/dist'))
});

// Watchers
gulp.task('watch', ['connect-sync', 'sass', 'browserify'], function() {
  gulp.watch('assets/styles/scss/**/*.scss', ['sass']);
  gulp.watch('assets/scripts/src/**/*.js', ['browserify']); 
})