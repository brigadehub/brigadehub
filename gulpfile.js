var gulp = require('gulp')
var exec = require('child_process').exec
var watch = require('gulp-watch') // eslint-disable-line

gulp.task('launch', function () {
  exec('nodemon app.js', function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    console.log(err)
  })
})

gulp.task('watch', function () {
  gulp.watch('./*', ['logging'])
})

gulp.task('logging', function () {
  console.log('change noted')
})

gulp.task('default', ['launch', 'watch'])
