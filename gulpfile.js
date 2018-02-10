var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
nested = require('postcss-nested'),
cssvars = require('postcss-simple-vars');

gulp.task('default', function(){
  console.log('this is gulp!');
});

gulp.task('style', function(){
  return gulp.src('./css/index.css')
    .pipe(postcss([nested, autoprefixer, cssvars]))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function(){
  watch('./css/**/*.css', function(){
    gulp.start('style');
  });
});