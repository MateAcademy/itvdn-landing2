const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');





/*---------- Server --------*/
gulp.task('server', function () {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });
    gulp.watch('build/**/*').on('change', browserSync.reload);
});


/*------------ Pug compile ------------------*/
gulp.task('templates:compile', function buildHTML() {
    return gulp.src('src/templates/index.pug')
        .pipe(pug({
            //Your option here
            pretty: true
        }))
        .pipe(gulp.dest('build'))
})

/*--------------- Styles compile -----------------*/
gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./css'));
});

/*------------ Delete -----------------*/
gulp.task('clean', function del(cb) {
    return rimraf('build', cb);
});

/*--------------- Copy fonts ----------------*/
gulp.task('copy:fonts', function () {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

/*---------------- Copy images ---------------------*/
gulp.task('copy:images', function () {
    return gulp.src('./source/images/**/*.*')
        .pipe(gulp.dest('build/mages'));
});

/*---------------- Copy ------------------*/
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));


/*-------------- Watchers -------------------*/
gulp.task('watch', function (){
    gulp.watch('src/template/**/*.pug', gulp.series('templates:compile'));
    gulp.watch('src/styles/**/*.pug', gulp.series('styles:compile'));
})

/*----------------------------*/
gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('templates:compile', 'styles:comple', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
));


