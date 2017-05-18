var gulp = require('gulp');
var plugins  = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*']
});
var root = '.';

gulp.task('sass', function() {
    var localDest = root +'/css';
    gulp.src(localDest +'/importer.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.rename({basename : 'style', suffix: ''}))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(localDest));
});

gulp.task('templates', function() {
    gulp.src(root+'/*.pug')
        .pipe(plugins.pug({
            pretty: true
        }))
        .on('error', plugins.notify.onError(function (error) {
            return 'An error occurred while compiling pug.\nLook in the console for details.\n' + error;
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('default',['sass','templates'],function () {
    gulp.watch(root+'/css/**/*.scss',['sass']);
    gulp.watch([
        root+'/*.pug',
        root+'/templates/**/*.pug'
    ],['templates']);
});