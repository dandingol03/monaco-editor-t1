const gulp = require('gulp');
var babel = require('gulp-babel');
var gulpLogger =require( './desktop/src/logger/gulpLogger');
var path=require('path');
var child_process = require('child_process');
var electron = require('electron-connect').server.create();
var ROOT_PATH = path.resolve(__dirname);
var DESKTOP_PATH = path.resolve(ROOT_PATH, 'desktop');
var BUNDLE_PATH=path.resolve(ROOT_PATH,'bundle');
var child=null;

//TODO:add gulp webpack-dev-server hot-reload

gulp.task('babel:electron-main', function () {
    return gulp.src([DESKTOP_PATH + '/main.js', DESKTOP_PATH + '/src/**/*.js'], { base: DESKTOP_PATH })
        .pipe(babel())
        .pipe(gulp.dest(BUNDLE_PATH));
});

gulp.task('watch:electron', function () {
    electron.start();
    gulp.watch(['./app/src/main.js', './app/src/main/**/*.js'], electron.restart);
    gulp.watch(['./app/dist/**/*.{html,js,css}'], electron.reload);
});

gulp.task('start',['babel:electron-main'],function () {

    child = child_process.fork("" + (path.join(__dirname, './node_modules/.bin/electron')), [__dirname, "--dev-mode"], {
        cwd: __dirname,
        env: process.env
    });

});
