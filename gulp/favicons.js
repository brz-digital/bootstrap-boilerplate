import * as cons from './constants';
import gulp from 'gulp';

// Optimize icons
gulp.task('favicons', () => {
    return gulp.src(`${cons.src}/favicons/**/*`)
    .pipe(gulp.dest(`${cons.tmp}/favicons`))
    .pipe(cons.$.size({title: '[favicons]', showFiles: true}))
});
