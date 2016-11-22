module.exports = function combineMiddleware (middlewareArray) {
  return middlewareArray.reduce(function (a, b) {
    return function (req, res, next) {
      a(req, res, function (err) {
        if (err) {
          return next(err)
        }
        b(req, res, next)
      })
    }
  })
}
