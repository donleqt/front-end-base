const gulp = require('gulp');
const child_process = require('child_process');
const plugins  = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*']
});
const root = '.';
const port = 3000;

gulp.task('sass', function() {
    var localDest = root +'/css';
    gulp.src(localDest +'/importer.scss')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.rename({basename : 'style', suffix: ''}))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest(localDest))
        .pipe(plugins.livereload());
});

gulp.task('templates', function() {
    gulp.src(root+'/*.pug')
        .pipe(plugins.pug({
            pretty: true
        }))
        .on('error', plugins.notify.onError(function (error) {
            return 'An error occurred while compiling pug.\nLook in the console for details.\n' + error;
        }))
        .pipe(gulp.dest('.'))
        .pipe(plugins.livereload());
});

gulp.task('host',function () {
    child_process.exec('ws --port ' +port, {
        cwd: __dirname
    })
        .on('error',function (err) {
            console.log(err);
        });
    console.log('Host listen on port ' +port);
});
gulp.task('default',['sass','templates','host'],function () {
    plugins.livereload.listen();
    gulp.watch(root+'/css/**/*.scss',['sass']);
    gulp.watch([
        root+'/*.pug',
        root+'/templates/**/*.pug'
    ],['templates']);
});