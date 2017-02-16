const gulp = require('gulp');
const gutil = require('gulp-util');
const vulcanize = require('gulp-vulcanize');
const webpack = require('gulp-webpack');
const rename = require("gulp-rename");
const templates = require('./gulp-tasks/templates');
const clean = require('gulp-clean');
const symlink = require('gulp-sym');
const child_process = require('child_process');
const colors = require('colors');

gulp.task('clean', () => {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('copy:bower', ['clean'], () => {
    gulp.src('bower_components/**')
        .pipe(gulp.dest('src/bower_components'));
});

gulp.task('vulcanize', ['clean', 'copy:bower', 'copy-libs'], () => {
    gulp.src('src/index.html')
        .pipe(vulcanize({
            abspath: '',
            excludes: ['cordova.js', 'libs/', 'js/app.js'],
            stripExcludes: false,
            inlineScripts: true,
            inlineCss: false,
        }))
        .pipe(templates.import)
        .on('error', gutil.log)
        .pipe(gulp.dest('dist/web/'));
});

gulp.task('copy-static', ['clean'], () => {
    gulp.src(['src/**/*.svg', 'src/**/*.jpg', 'src/**/*.png', '!src/bower_components/**'])
        .pipe(gulp.dest('dist/web/'));

    return gulp.src('src/css/**')
        .pipe(gulp.dest('dist/web/css/'));
});

gulp.task('copy-libs', ['clean'], () => {
    gulp.src('bower_components/web-animations-js/web-animations-next-lite.min.js')
        .pipe(gulp.dest('dist/web/bower_components/web-animations-js/'));

    gulp.src('bower_components/font-roboto/roboto.css')
        .pipe(gulp.dest('dist/web/bower_components/font-roboto/'));

    gulp.src(['bower_components/font-roboto/fonts/*.ttf'])
        .pipe(gulp.dest('dist/web/bower_components/font-roboto/fonts/'));

    return gulp.src('bower_components/webcomponentsjs/webcomponents-lite.min.js')
        .pipe(gulp.dest('dist/web/libs'));
});

gulp.task('compile', ['clean'], () => {
    return gulp.src('src/js/bootstrap.js')
        .pipe(webpack({
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel',
                        query: {
                            presets: ['babel-preset-es2015'],
                            sourceMaps: true,
                        }
                    }
                ]
            },
            output: {
                sourceMapFilename: 'app.map',
            },
            devtool: 'source-map',
        }))
        .pipe(rename({ basename: 'app' }))
        .pipe(gulp.dest('dist/web/js'));
});

gulp.task('build', ['copy-static', 'vulcanize', 'compile', 'copy-libs']);

gulp.task('platform:web', ['build'], () => {
    return gulp.src('platforms/web/**')
        .pipe(gulp.dest('dist/web/'));
});

gulp.task('platform:cordova', ['build'], () => {
    gulp.src('platforms/cordova')
        .pipe(symlink('dist/cordova'));

    return gulp.src('dist/web/**')
        .pipe(gulp.dest('dist/cordova/www/'))
});

gulp.task('platform:fxos', [], () => {
    gulp.src('platforms/fxos/**')
        .pipe(gulp.dest('dist/fxos'));
});

gulp.task('platform:android', ['platform:cordova'], () => {
    child_process.execSync('cordova build android', { cwd: 'platforms/cordova', stdio: [0, 1, 2] });

    console.log(colors.cyan('moving APKs...'));

    return gulp.src(['platforms/cordova/platforms/android/build/outputs/apk/**'])
        .pipe(gulp.dest('dist/android/'));
});

gulp.task('run:android', [], () => {
    return child_process.execSync('cordova run android --nobuild', { cwd: 'platforms/cordova', stdio: [0, 1, 2]})
});

gulp.task('platform:android:run', ['platform:android'], () => {
    return child_process.execSync('cordova run android --nobuild', { cwd: 'platforms/cordova', stdio: [0, 1, 2]});
});

gulp.task('default', ['platform:web']);
