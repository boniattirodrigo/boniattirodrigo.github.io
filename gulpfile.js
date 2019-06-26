var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    cp           = require('child_process'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    deploy       = require('gulp-gh-pages'),
    imagemin     = require('gulp-imagemin'),
    jshint       = require('gulp-jshint'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'images', 'scripts', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('jshint', function() {
    gulp.src('assets/js/*.js')
    .pipe(jshint({
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        node: true,
        sub: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
            jQuery: true
        },
    }))
    .pipe(jshint.reporter('default'))
});

gulp.task('images', function() {
    gulp.src('assets/img/**')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'))
    .pipe(gulp.dest('_site/dist/img'))
});

gulp.task('sass', function () {
    gulp.src('assets/scss/main.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['scss'],
            outputStyle: 'compressed',
            onError: browserSync.notify
        }))
        .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('_site/dist/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts', ['jshint'], function() {
    gulp.src('assets/js/*.js')
    .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.dest('_site/dist/js'));
});

gulp.task('watch', function () {
    gulp.watch('assets/scss/**/*.scss', ['sass']);
    gulp.watch('assets/js/*.js', ['scripts']);
    gulp.watch('assets/img/*', ['images']);
    gulp.watch(['*.html', 'blog/*.html', 'talks/*.html', '_layouts/*.html', '_includes/*.html', '_posts/*', '_data', 'blog'], ['jekyll-rebuild']);
});

gulp.task('deploy', ['jekyll-build'], function () {
    return gulp.src('./_site/**/*')
        .pipe(deploy());
});

gulp.task('default', ['browser-sync', 'watch']);
