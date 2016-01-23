/**
 * GET /
 * Home page.
 */
exports.index = function (req, res) {
  console.log(req.user)
  res.render('home', {
    title: 'Home',
    brigade: req.locals.brigade
  })
}
