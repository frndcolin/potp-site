var gulp = require('gulp');
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