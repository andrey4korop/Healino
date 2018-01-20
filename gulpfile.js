var gulp = require('gulp'),
	sass = require('gulp-sass'),
    smartgrid = require('smart-grid');
var browserSync = require('browser-sync').create();
var gcmq = require('gulp-group-css-media-queries');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var settings = {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 24, /* number of grid columns */
    offset: "5px", /* gutter width px || % */
    container: {
        maxWidth: '960px', /* max-width �n very large screen */
        fields: '5px' /* side fields */
    },
    breakPoints: {
        lg: {
            'width': '1100px', /* -> @media (max-width: 1100px) */
            'fields': '5px' /* side fields */
        },
        md: {
            'width': '960px',
            'fields': '5px'
        },
        sm: {
            'width': '780px',
            'fields': '5px'
        },
        xs: {
            'width': '560px',
            'fields': '5px'
        }
        /* 
        We can create any quantity of break points.

        some_name: {
            some_width: 'Npx',
            some_offset: 'N(px|%)'
        }
        */
    }
};
	
gulp.task('sass', function(){
	return gulp.src('./scss/a.scss')
	.pipe(sass().on('error', sass.logError))
    //.pipe(gcmq())
    .pipe(autoprefixer({
		browsers:['> 0.1%'],
		cascade: false
	}))
	/*.pipe(cleanCSS({
		debug: true,
		level: 2}, 
		function(details) {
		  console.log('[cleanCSS]  Original   {' + details.name + '}: ' + details.stats.originalSize + ' Byte [' + Math.floor(details.stats.originalSize /1024) + ' KByte]');
		  console.log('[cleanCSS]  Compressed {' + details.name + '}: ' + details.stats.minifiedSize + ' Byte [' + Math.floor(details.stats.minifiedSize /1024) + ' KByte]');
		  console.log('[cleanCSS]  Compressed {' + details.name + '} to : ' + Math.floor(details.stats.minifiedSize / details.stats.originalSize * 100) + ' %');
    }))*/
	.pipe(gulp.dest('./css'))
	.pipe(gulp.dest('./healinoVue/static/css'))
	.pipe(browserSync.stream());
});
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
        //proxy: "autist/"
    });

    gulp.watch('./scss/a.scss', ['sass'])
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('watch', function(){
	gulp.watch('./scss/a.scss', ['sass'])
});

gulp.task('sm', function(){
	smartgrid('./scss', settings);
});