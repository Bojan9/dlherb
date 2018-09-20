
/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
	sass = require('gulp-sass');
autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	livereload = require('gulp-livereload'),
	del = require('del'),
	gutil = require('gulp-util'),
	ftp = require('gulp-ftp');

// Styles
gulp.task('styles', function() {
	return sass('sass/main.scss', { style: 'expanded' })
		.pipe(autoprefixer('last 2 version'))

		.pipe(gulp.dest('css/'))
		.pipe(notify({ message: 'Styles task complete' }));
});


gulp.task('sass', function () {
	return gulp.src('sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('css/'));
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/scripts'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('build/scripts'))
		.pipe(notify({ message: 'Scripts task complete' }));
});


// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('html', 'styles', 'scripts', 'images');
});



// Watch
gulp.task('watch', function() {
	// Watch .scss files
	gulp.watch('src/sass/*.scss', ['sass']);
});