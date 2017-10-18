var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var sequence = require('run-sequence');

gulp.task('compile', function() {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

// ソースコードへの変更を監視するタスク(5.2.5.1)
gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['compile']);
    gulp.watch('src/**/*.html', ['copy']);
});

// サーバ再起動用（5.2.5.2）
gulp.task('start', function() {
    nodemon({
        watch: 'dist',
        script: 'dist/index.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development'}
    });
});

// テンプレートファイルのコピー（6.1）
gulp.task('copy', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
})

// gulp.task('default', ['watch', 'compile']);
gulp.task('default', function(callback) {
    sequence(['compile', 'watch', 'copy'], 'start', callback);
});