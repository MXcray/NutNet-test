const {src, dest, parallel, series, watch} = require('gulp');
const browserSync   = require('browser-sync').create();
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify-es').default;
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const cleancss      = require('gulp-clean-css');
const del           = require('del');
const pug           = require('gulp-pug');

function browsersync() {
    browserSync.init({
        server: {baseDir: 'app/'}
    })
}

function toHtml() {
    return src('app/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest('app'))
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        'app/js/app.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream())
}

function styles() {
    return src([
        'app/sass/nullstyle.css',
        'app/sass/fonts.scss',
        'app/sass/bootstrap-grid.min.css',
        'app/sass/main.scss'
    ])
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({ overrideBrowserlist: ['last 10 versions'], grid: true }))
    .pipe(cleancss(( { level: { 1: { specialComments: 0 } } , format: 'beautify'  } ))) //тут
    .pipe(dest('app/css/'))
}

function cleandist() {
    return del('dist/**/*', { force: true })
}

function buildcopy() {
    return src([
        'app/css/*.css',
        'app/js/**/*.min.js',
        'app/images/*',
        'app/fonts/*.ttf',
        'app/**/*.html'
    ], { base: 'app' })
    .pipe(dest('dist'))
}

function startWatch() {
    watch([
        'app/**/*.js',
        '!app/**/*.min.js'
    ], scripts);
    watch('spp/**/*.pug').on('change', browserSync.reload);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch('app/**/*.scss', styles).on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.toHtml      = toHtml;
exports.scripts     = scripts;
exports.styles      = styles;
exports.build       = series(cleandist, toHtml, styles, scripts, buildcopy);

exports.default     = parallel(toHtml, styles, scripts, browsersync, startWatch);