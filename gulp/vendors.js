 import * as cons from './constants';
import gulp from 'gulp';

gulp.task('vendors', () => {
  return gulp.src([
    // Jquery
    `${cons.vendor}/jquery/dist/jquery.js`,

    // Popper
    `${cons.vendor}/popper.js/dist/umd/popper.min.js`,

    // Bootstrap
    `${cons.vendor}/bootstrap/js/dist/util.js`,
    `${cons.vendor}/bootstrap/js/dist/alert.js`,
    `${cons.vendor}/bootstrap/js/dist/button.js`,
    `${cons.vendor}/bootstrap/js/dist/collapse.js`,
    `${cons.vendor}/bootstrap/js/dist/dropdown.js`,
    `${cons.vendor}/bootstrap/js/dist/modal.js`,
    `${cons.vendor}/bootstrap/js/dist/scrollspy.js`,
    `${cons.vendor}/bootstrap/js/dist/tab.js`,
    `${cons.vendor}/bootstrap/js/dist/toast.js`,
    `${cons.vendor}/bootstrap/js/dist/tooltip.js`,

    // Jquery Mask
    `${cons.vendor}/jquery-mask-plugin/dist/jquery.mask.js`,

    // Swiper
    `${cons.vendor}/swiper/dist/js/swiper.js`,

    // Maps
    `${cons.libs}/maps/jquery.maps.js`
  ])
  .pipe(cons.$.newer(`${cons.tmp}/scripts`))
  .pipe(cons.$.sourcemaps.init())
  .pipe(cons.$.sourcemaps.write())
  .pipe(cons.$.concat('vendors.min.js'))
  .pipe(cons.$.uglify())
  .pipe(gulp.dest(`${cons.tmp}/scripts`))
  .pipe(cons.$.size({title: '[vendors]'}));
});
