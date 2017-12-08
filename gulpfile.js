var gulp = require('gulp');
var path = require('path');
var watch = require('gulp-watch');
var concatCss = require('gulp-concat-css');


gulp.task('watch-css', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event 
    return watch('src/css/*.css', function () {
        gulp.src('src/css/css-loader.css')
            .pipe(concatCss("bundled.css"))
            .pipe(gulp.dest('dist/public/css/'));
    });
});

var sitemap = require('gulp-sitemap');
 
gulp.task('sitemap', function () {
    gulp.src('dist/index.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'http://www.elfin-hearing.surge.sh'
        }))
        .pipe(gulp.dest('./dist/maps/'));
});