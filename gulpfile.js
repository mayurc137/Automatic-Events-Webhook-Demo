const gulp = require('gulp');

const plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

gulp.task('lint', () => {
  gulp.src('./**/*.js')
  .pipe(plugins.jshint());
});

gulp.task('develop', () => {
  plugins.nodemon({ script: 'bin/www', ext: 'html js', ignore: ['public/javascripts/**'] })
  .on('change', ['lint'])
  .on('restart', () => {
    console.log('restarted!');
  });
});
