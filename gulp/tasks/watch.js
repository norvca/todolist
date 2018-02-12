var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function(){
  // 初始化 browserSync
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function(){
    browserSync.reload();
  });

  watch('./app/assets/css/**/*.css', function(){
    gulp.start('cssInject');
  });
});

gulp.task('cssInject', ['style'], function(){
  return gulp.src('./app/dist/styles/style.css')
    .pipe(browserSync.stream());
});