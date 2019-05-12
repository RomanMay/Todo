let gulp = require('gulp');
let server = require('gulp-server-livereload');

gulp.task('default', () => {
	gulp.src('public')
		.pipe(server({
			livereload: true,
			defaultFile: 'index.ejs',
			directoryListing: false,
			open: false
		}));
});