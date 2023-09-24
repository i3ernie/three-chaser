const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const build_chaserES = require('./build/build_es');
const build_chaserAMD = require('./build/build_amd');

gulp.task("buildES", build_chaserES );


gulp.task("buildAMD", build_chaserAMD );

gulp.task('default', gulp.series('buildES') );

gulp.task('copy', function( ) {
    return gulp.src([
        "./node_modules/three/build/three.module.js",
        "./node_modules/three/examples/jsm/controls/OrbitControls.js",
        "./node_modules/three-viewport/dist/viewport.es.js",
        "./node_modules/three-domevents/dist/domevents.pack.es.js"
    ])
    .pipe( gulp.dest('./examples/js/vendor/') );

});