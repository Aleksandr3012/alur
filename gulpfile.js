'use strict';
var sass = require('gulp-sass')(require('sass'));
global.$ = {
    gulp: require('gulp'),
    del: require('del'), 
    pug: require('gulp-pug'),
    notify: require('gulp-notify'), 
    svgmin: require('gulp-svgmin'),
    cheerio: require('gulp-cheerio'),
    replace: require('gulp-replace'),
    svgSprite: require('gulp-svg-sprite'),
    sass: sass,
    npmDist: require('gulp-npm-dist'),
    newer: require('gulp-newer'),
    rename: require('gulp-rename'),
    gp: require('gulp-load-plugins'),
    responsive: require('gulp-responsive'),

    gulpif: require('gulp-if'),
    sassGlob: require('gulp-sass-glob'),
    tabify: require('gulp-tabify'),
    envDev: false,
    gcmq: require('postcss-sort-media-queries'),
    gp: require('gulp-load-plugins')(),
    browserSync: require('browser-sync').create(),
    postcss: require('gulp-postcss'),
    autoprefixer: require('autoprefixer'),
    postcssPresetEnv: require('postcss-preset-env'),
    cssnano: require('cssnano'), 
    nested: require('postcss-nested'),
    pscss: require('postcss-scss'),
    syntax: require('postcss-syntax')({ scss: 'postcss-scss'}),
    plumber: require('gulp-plumber'),
    // resizer: require('gulp-images-resizer'),
    path: {
        tasks: require('./gulp/config/tasks.js'),
    },
    public: 'public',
    sourse: 'sourse',
}
$.path.tasks.forEach(function (taskPath) {
    require(taskPath)();
});


$.gulp.task('img', $.gulp.series('cleanimg', 'img-responsive', 
// 'img1x'
));
$.gulp.task('libs', $.gulp.series('cleanlibs', 'copylibs'));

$.gulp.task('default', $.gulp.series('svg', 'svgCopy',

    $.gulp.parallel(
        'img',
        'pug',
        'libs',
        'scripts:common',
        'sass',
        'serv', 'watch'
    ),
));
