'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
	less = require('gulp-less'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: { //��� �� ������ ���� ���������� ������� ����� ������ �����
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        video: 'build/video/'
    },
    src: { //���� ������ ����� ���������
        html: 'src/*.html', //��������� src/*.html ������� gulp ��� �� ����� ����� ��� ����� � ����������� .html
        js: 'src/js/main.js',//� ������ � �������� ��� ����������� ������ main �����
        style: 'src/styles/styles.less',
        img: 'src/img/**/*.*', //��������� img/**/*.* �������� - ����� ��� ����� ���� ���������� �� ����� � �� ��������� ���������
        fonts: 'src/fonts/**/*.*',
        video: 'src/video/**/*.*'
    },
    watch: { //��� �� ������, �� ���������� ����� ������ �� ����� ���������
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/styles/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        video: 'src/video/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend"
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) //������� ����� �� ������� ����
        .pipe(rigger()) //�������� ����� rigger
        .pipe(gulp.dest(path.build.html)) //�������� �� � ����� build
        .pipe(reload({stream: true})); //� ������������ ��� ������ ��� ����������
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //������ ��� main ����
        .pipe(rigger()) //�������� ����� rigger
        .pipe(sourcemaps.init()) //�������������� sourcemap
        .pipe(uglify()) //������ ��� js
        .pipe(sourcemaps.write()) //�������� �����
        .pipe(gulp.dest(path.build.js)) //�������� ������� ���� � build
        .pipe(reload({stream: true})); //� ������������ ������
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //������� ��� main.scss
        .pipe(sourcemaps.init()) //�� �� ����� ��� � � js
        .pipe(less()) //������������
        .pipe(prefixer()) //������� ��������� ��������
        .pipe(cssmin()) //������
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //� � build
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //������� ���� ��������
        .pipe(imagemin({ //������ ��
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //� ������ � build
        .pipe(reload({stream: true}));
});
gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
gulp.task('video:build', function () {
    gulp.src(path.src.video)
        .pipe(gulp.dest(path.build.video))
});


gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'video:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.video], function(event, cb) {
        gulp.start('video:build');
    });
});



gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);