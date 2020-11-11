var gulp = require('gulp');

var path = require("path");
var hostBuildFolder = path.resolve(__dirname, './public');
var nodeFolder = path.resolve(__dirname, './node');
var installationFolder = path.resolve(__dirname, './installation');

var fullAppBuildFolder = path.resolve(__dirname, './app-build');

gulp.task('copy-app', function() {
    return gulp.src(
        path.resolve(hostBuildFolder, 'host.js')
    ).pipe(
        gulp.dest(fullAppBuildFolder)
    );
});

gulp.task('copy-node-win', function() {
    return gulp.src(
        path.resolve(nodeFolder, 'win/*'),
    ).pipe(
        gulp.dest(fullAppBuildFolder)
    );
});

gulp.task('copy-node-linux', function() {
    return gulp.src(
        path.resolve(nodeFolder, 'linux/*'),
    ).pipe(
        gulp.dest(fullAppBuildFolder)
    );
});

gulp.task('copy-install-win', function() {
    return gulp.src(
        path.resolve(installationFolder, 'install.bat')
    ).pipe(
        gulp.dest(fullAppBuildFolder)
    );
});

gulp.task('copy-install-linux', function() {
    return gulp.src(
        path.resolve(installationFolder, 'install.sh')
    ).pipe(
        gulp.dest(fullAppBuildFolder)
    );
});

exports.buildWin = gulp.series('copy-app', 'copy-node-win', 'copy-install-win');
exports.buildLinux = gulp.series('copy-app', 'copy-node-linux', 'copy-install-linux');

