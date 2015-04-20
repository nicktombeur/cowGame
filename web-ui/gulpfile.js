var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('./assets/css/**/*.sass')
        .pipe(sass({
            indentedSyntax: true
        }))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('./assets/css/**/*.sass', ['sass']);
});

gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('default', ['webserver', 'sass', 'watch']);