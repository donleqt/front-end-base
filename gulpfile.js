const gulp = require('gulp');
const webserver = require('gulp-webserver');
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
        .pipe(plugins.autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
        }))
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
  gulp.src(root)
      .pipe(webserver({
        livereload: true,
        port: port,
        directoryListing: true,
        open: true
      }));
});
gulp.task('default',['sass','templates','host'],function () {
    gulp.watch(root+'/css/**/*.scss',['sass']);
    gulp.watch([
        root+'/*.pug',
        root+'/templates/**/*.pug'
    ],['templates']);
});