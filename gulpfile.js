const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;
const prefix      = require('gulp-autoprefixer');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps  = require('gulp-sourcemaps');
const jshint      = require('gulp-jshint');
const plumber     = require('gulp-plumber');
const notify      = require('gulp-notify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

function onError(err){
    notify.onError({
        title: "Sass compiling error",
        message:  err.message
    })(err);
    this.emit('end');
}

gulp.task('script', function () {
    return gulp.src('js/main.js')
            .pipe(babel({
              presets: ['es2015','stage-0']
            }))
            .pipe(rename('app.js'))
            .pipe(gulp.dest('js'))
            .pipe(reload({stream: true}));
});

gulp.task('styles', function() {
    return gulp.src('sass/**/*.scss')
            .pipe(plumber({errorHandler: onError}))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
            .pipe(gulp.dest('css'))
            .pipe(cleanCSS())
            .pipe(rename('main.min.css'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('css'))
            .pipe(reload({stream: true}));
});



gulp.task('build', function () {
    gulp.run('styles');
    gulp.run('jshint');
});

gulp.task('watch', function () {
    browserSync.init({
        server: "."
    });
    gulp.watch('./sass/**/*.*', ['styles']);
    gulp.watch('./js/main.js',['script']);
});

gulp.task('default', ['watch']);
