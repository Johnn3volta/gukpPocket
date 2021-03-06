var syntax = 'sass'; // Syntax: sass or scss;

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    cleancss     = require('gulp-clean-css'),
    rename       = require('gulp-rename'),
    notify       = require("gulp-notify"),
    uglify       = require("gulp-uglify"),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function () {
    return gulp.src(['**/*.' + syntax + ''])
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss({level: {1: {specialComments: 0}}})) // Opt., comment out when debugging
        .pipe(gulp.dest('.'))
});
gulp.task('js-compressed', function () {
    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest('./js'))
});

gulp.task('watch', function () {
    gulp.watch(['**/*.' + syntax + ''], gulp.series('styles'));
});

gulp.task('js:watch',function () {
   gulp.watch(['./js/*.js'],gulp.series('js-compressed')) ;
});

gulp.task('default', gulp.parallel('watch'));
gulp.task('jsw', gulp.parallel('js:watch'));