const gulp = require('gulp');
const gutil = require('gulp-util');
const vulcanize = require('gulp-vulcanize');
const webpack = require('gulp-webpack');
const rename = require("gulp-rename");


gulp.task('vulcanize', ['copy-libs'], () => {
    return gulp.src('src/index.html')
        .pipe(vulcanize({
            abspath: '',
            excludes: ['cordova.js', 'libs/', 'js/app.js'],
            stripExcludes: false,
            inlineScripts: false,
            inlineCss: false,
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-static', () => {
    gulp.src(['src/**/*.svg', 'src/**/*.jpg'])
        .pipe(gulp.dest('dist/'));

    return gulp.src('src/css/**')
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('cordova', ['default'], () => {
    gulp.src('dist/**')
        .pipe(gulp.dest('platforms/cordova/www/'))
});

gulp.task('copy-libs', () => {
    return gulp.src('bower_components/webcomponentsjs/webcomponents-lite.min.js')
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('compile', () => {
    return gulp.src('src/js/bootstrap.js')
        .pipe(webpack({
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel',
                        query: {
                            presets: ['es2015'],
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
        .pipe(gulp.dest('dist/js'));
})

gulp.task('default', ['copy-static', 'vulcanize', 'compile'], () => {
    return true;
});
