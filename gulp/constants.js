import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const dist = 'dist';
const src = 'src';
const tmp = '.tmp';
const vendor = 'bower_components';
const libs = 'libs';

export { $, reload, dist, src, tmp, vendor, libs };
