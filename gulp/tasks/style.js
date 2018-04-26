var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
nested = require('postcss-nested'),
cssvars = require('postcss-simple-vars'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins');

gulp.task('style', function(){
  return gulp.src('./app/assets/css/style.css')
    .pipe(postcss([cssImport, mixins, nested, autoprefixer, cssvars]))
    // 发生错误时 gulp 不退出
    .on('error', function(errorInfo){
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/dist/styles'));
});