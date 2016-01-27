'use strict';

const gulp = require('gulp'),
    del = require('del'),
    babel = require('gulp-babel'),
    livereload = require('gulp-livereload'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    gutil = require('gutil'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    less = require('gulp-less'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    stringify = require('stringify');

gulp.task('default', ['build']);

gulp.task('build', ['scripts', 'scripts:hint', 'html', 'styles']);

gulp.task('styles', () => {
    return gulp.src('app/styles/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(livereload());
});

gulp.task('scripts', () => {
    let b = browserify({
        entries: ['app/js/index.js'],
        cache: {},
        packageCache: {},
        debug: true
    });
    b.transform(babelify, {presets: ['es2015']});
    b.transform(stringify);
    b.on('error', gutil.log);
    b.on('time', gutil.log);

    return b.bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

gulp.task('scripts:hint', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(jshint({esnext: true}))
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('html', () => {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('clean', () => {
    del(['dist'], cb);
});

gulp.task('watch', ['build'], () => {
    livereload.listen();

    gulp.watch('app/index.html', ['html']);
    gulp.watch(['app/js/**/*.js', 'app/partials/**/*'], ['scripts', 'scripts:hint']);
    gulp.watch('app/styles/*.less', ['styles']);
});