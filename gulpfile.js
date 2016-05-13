var gulp = require('gulp')
var exec = require('child_process').exec

gulp.task('test', function () {
  console.log('test')
})

gulp.task('launch', function () {
  exec('nodemon app.js', function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    console.log(err)
  })
})
