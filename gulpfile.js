const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;

// Compile SASS and Minify CSS
gulp.task('sass', () => {
	const plugins = [cssnano()];
	return gulp.src(['src/scss/*.scss'])
		.pipe(sass())
		.pipe(postcss(plugins))
		// .pipe(gulp.dest('src/css'))
		.pipe(gulp.dest('src/newCss'))
		.pipe(browserSync.stream());
});

// Optimize Images
gulp.task('shrinkImg', () => {
	return gulp.src('src/img/*')
		.pipe(imagemin({ progressive: true }))
		.pipe(gulp.dest('src/dist/img'));
});

gulp.task('dudify', () => {
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('src/dist/js'));
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