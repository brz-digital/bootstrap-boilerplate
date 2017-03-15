import * as cons from './constants';
import gulp from 'gulp';
import csscomb from 'csscomb';

gulp.task('minifyCss', () => {
    return gulp.src(`${cons.tmp}/styles/main.css`)
    .pipe(cons.$.rename(function (path) {
        path.basename += ".min";
        path.extname = ".css"
    }))
    .pipe(cons.$.cssnano())
    .pipe(cons.$.csscomb())
    .pipe(gulp.dest(`${cons.tmp}/styles`))
    .pipe(cons.$.size({title: '[minifyCss]'}))
});
