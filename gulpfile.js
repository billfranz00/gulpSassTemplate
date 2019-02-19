const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile SASS
gulp.task('sass', () => {
	return gulp.src(['src/scss/*.scss'])
		.pipe(sass())
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
});

// Watch & Serve
gulp.task('run', gulp.series('sass', () => {
	browserSync.init({
		server: './src'
		// proxy: 'https://www.shop.com' // Update Live Site
	});
	gulp.watch(['src/scss/*.scss'], gulp.series('sass'));
	gulp.watch(['src/*.html']).on('change', browserSync.reload)
}));

// Defualt Task
gulp.task('default', gulp.series('run'));