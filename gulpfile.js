var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
nested = require('postcss-nested'),
cssvars = require('postcss-simple-vars'),
cssImport = require('postcss-import');

gulp.task('default', function(){
  console.log('this is gulp!');
});

gulp.task('style', function(){
  return gulp.src('./app/assets/css/style.css')
    .pipe(postcss([cssImport, nested, autoprefixer, cssvars]))
    .pipe(gulp.dest('./app/dist/styles'));
});

gulp.task('watch', function(){
  watch('./app/assets/css/**/*.css', function(){
    gulp.start('style');
  });
});