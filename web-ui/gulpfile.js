var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    karma = require('karma').server,
    runSequence = require('run-sequence');

gulp.task('sass', function() {
    gulp.src('./assets/css/**/*.sass')
        .pipe(sass({
            indentedSyntax: true
        }))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('./assets/css/**/*.sass', ['sass']);
    gulp.watch('./app/**/*.js', ['test']);
});

gulp.task('webserver', function() {
    connect.server({
        livereload: true
    });
});
gulp.task('test',function (done) {
    return karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('default', ['test','webserver', 'sass', 'watch']);