const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const build_chaserES = require('./build/build_es');
const build_chaserAMD = require('./build/build_amd');

gulp.task("buildES", build_chaserES );


gulp.task("buildAMD", build_chaserAMD );

gulp.task('default', gulp.series('buildES') );