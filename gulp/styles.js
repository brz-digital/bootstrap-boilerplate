import * as cons from './constants';
import gulp from 'gulp';
import csscomb from 'csscomb';

gulp.task('styles', () => {
    return gulp.src(`${cons.src}/styles/main.{scss,sass}`)
    .pipe(cons.$.newer(`${cons.tmp}/styles`))
    .pipe(cons.$.sourcemaps.init())
    .pipe(cons.$.cssGlobbing({
        extensions: ['.scss', '.sass']
    }))
    .pipe(cons.$.plumber())
    .pipe(cons.$.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
    }).on('error', cons.$.sass.logError))
    .pipe(cons.$.autoprefixer({browsers: ['last 1 version']}))
    .pipe(cons.$.sourcemaps.write())
    .pipe(cons.$.csscomb())
    .pipe(gulp.dest(`${cons.tmp}/styles`))
    .pipe(cons.$.size({title: '[styles]'}))
    .pipe(cons.reload({stream: true}));
});
