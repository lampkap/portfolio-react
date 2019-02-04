const gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-csso');

gulp.task('sass', function () {
    return gulp
        .src(['./client/src/assets/scss/*.scss', './client/src/assets/scss/_*.scss', './client/src/assets/scss/**/_*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./client/src/assets/css'))
});

gulp.task('sass:watch', function () {
    gulp.watch('./client/src/assets/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass:watch']);