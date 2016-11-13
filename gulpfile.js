var gulp = require('gulp')
var exec = require('child_process').exec
var watch = require('gulp-watch') // eslint-disable-line
var nodemon = require('gulp-nodemon')

gulp.task('launch:node', function () {
  nodemon({
    script: 'app.js',
    ignore: ['node_modules/*']
  })
})
gulp.task('launch:mongodb', function () {
  exec('mongod', function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    console.log(err)
  })
})

gulp.task('start:nomongo', ['launch:node'])
gulp.task('start', ['launch:node', 'launch:mongodb'])
