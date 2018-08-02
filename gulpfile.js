var syntax = 'sass'; // Syntax: sass or scss;

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    notify        = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function () {
    return gulp.src(['files/' + syntax + '/**/*.' + syntax + ''])
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss({level: {1: {specialComments: 0}}})) // Opt., comment out when debugging
        .pipe(gulp.dest('files/css'))
});

gulp.task('watch', function () {
    gulp.watch(['files/' + syntax + '/**/*.' + syntax + ''], gulp.series('styles'));
});

gulp.task('default', gulp.parallel('watch'));