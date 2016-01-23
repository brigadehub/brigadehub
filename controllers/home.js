/**
 * GET /
 * Home page.
 */
exports.index = function (req, res) {
  console.log(req.user)
  res.render(req.locals.brigade.theme.slug+'/views/home', {
    title: 'Home',
    brigade: req.locals.brigade
  })
}
