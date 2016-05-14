var gulp = require('gulp')
var exec = require('child_process').exec
var watch = require('gulp-watch') // eslint-disable-line
var browserify = require('browserify')
var source = require('vinyl-source-stream')

gulp.task('launch', function () {
  exec('nodemon app.js', function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    console.log(err)
  })
})

gulp.task('frontjswatch', function () {
  gulp.watch('themes/' + 'codeforpoland' + '/public/js/main.js', ['frontjscomp'])
})

gulp.task('frontjscomp', function () {
  return browserify('themes/codeforpoland/public/js/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('themes/codeforpoland/public/js/'))
})

gulp.task('default', ['launch', 'frontjswatch', 'frontjscomp'])
