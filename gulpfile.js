var gulp = require('gulp')
var exec = require('child_process').exec
var watch = require('gulp-watch') // eslint-disable-line
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var nodemon = require('gulp-nodemon')
var babel = require('gulp-babel')
var Cache = require('gulp-file-cache')

var cache = new Cache()

gulp.task('launch:compile', function () {
  var stream = gulp.src('./src/**/*.js')
    .pipe(cache.filter())
    .pipe(babel({
      presets: [ 'es2015', 'stage-2' ],
      plugins: ['transform-runtime']
    }))
    .pipe(cache.cache())
    .pipe(gulp.dest('./cache'))
  return stream
})

gulp.task('launch:node', function () {
  return nodemon({
    tasks: ['launch:compile'] ,
    script: './cache/app.js',
    ignore: ['node_modules/*', 'cache/*']
  })
})
gulp.task('launch:mongodb', function () {
  exec('mongod', function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    console.log(err)
  })
})
gulp.task('browserjswatch', function () {
  gulp.watch(['src/themes/codeforpoland/public/js/main.js', 'src/themes/codeforpoland/public/js/functions.js'], ['browserjscomp'])
})

gulp.task('browserjscomp', function () {
  return browserify('src/themes/codeforpoland/public/js/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('src/themes/codeforpoland/public/js/'))
})

gulp.task('csswatch', function () {
  gulp.watch('src/themes/codeforpoland/public/css/main.scss', ['csscomp', 'sourcemapcomp'])
})

gulp.task('csscomp', function () {
  return gulp.src('src/themes/codeforpoland/public/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/themes/codeforpoland/public/css'))
})

gulp.task('sourcemapcomp', function () {
  return gulp.src('src/themes/codeforpoland/public/css/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/themes/codeforpoland/public/css'))
})

gulp.task('build', ['browserjscomp', 'csscomp', 'sourcemapcomp'])
gulp.task('start:nomongo', ['launch:node', 'browserjswatch', 'browserjscomp', 'csswatch', 'csscomp', 'sourcemapcomp'])
gulp.task('start', ['launch:node', 'launch:mongodb', 'browserjswatch', 'browserjscomp', 'csswatch', 'csscomp', 'sourcemapcomp'])
