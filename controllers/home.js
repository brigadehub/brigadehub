/**
 * GET /
 * Home page.
 */
exports.index = function (req, res) {
  console.log(req.user)
  res.render(res.locals.brigade.theme.slug+'/views/home', {
    title: 'Home',
    brigade: res.locals.brigade
  })
}
