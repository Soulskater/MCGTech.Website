/**
 * Created by MCG on 2014.10.24..
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var del = require('del');

gulp.task('clean', function (cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['dist'], cb);
});

function copyJs() {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest('dist/js'));
}

function copyCss() {
    return gulp.src("src/css/**/*.css")
        .pipe(gulp.dest('dist/css'));
}

function copyFonts() {
    return gulp.src("src/fonts/*.*")
        .pipe(gulp.dest('dist/fonts'));
}

function copyFeatures() {
    return gulp.src(["src/features/**/*.html", "src/features/**/*.js", "src/features/**/*.css"])
        .pipe(gulp.dest('dist/features'));
}

function copyPackages() {
    return gulp.src("packages/**/*.*")
        .pipe(gulp.dest('dist/packages'));
}
function injectFeatures() {
    return gulp.src("src/index.html")
        .pipe(inject(gulp.src('./src/features/**/*.css', {read: false}), {relative: true, name: 'features'}))
        .pipe(inject(gulp.src('./src/features/**/*.js', {read: false}), {relative: true, name: 'features'}))
        .pipe(gulp.dest('dist/'));
}

gulp.task('copy-js', copyJs);

gulp.task('copy-css', copyCss);

gulp.task('copy-fonts', copyFonts);

gulp.task('copy-features', copyFeatures);

gulp.task('copy-packages', copyPackages);

gulp.task('inject-features', injectFeatures);

// Rerun the task when a file changes
gulp.task('watch', function () {
    watch('src/features/**/*.*', function (files) {
        return copyFeatures();
    });
    watch('src/index.html', function (files) {
        return injectFeatures();
    });
    watch('src/js/**/*.js', function (files) {
        return copyJs();
    });
    watch('src/css/**/*.css', function (files) {
        return copyCss();
    });
});

// Dev build
gulp.task('dev', ['copy-js', 'copy-fonts', 'copy-css', 'copy-features', 'copy-packages', 'inject-features', 'watch']);

// Build All
gulp.task('build', ['copy-js', 'copy-fonts', 'copy-css', 'copy-features', 'copy-packages', 'inject-features', 'clean']);