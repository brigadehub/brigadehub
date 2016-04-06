/**
 * GET /
 * Home page.
 */
exports.index = function (req, res) {
  console.log(req.user)
  res.render(res.locals.brigade.theme.slug + '/views/home', {
    view: 'home',
    title: 'Home',
    brigade: res.locals.brigade
  })
}

exports.indexEdit = function (req, res) {
  console.log(req.user)
  res.render(res.locals.brigade.theme.slug + '/views/home', {
    view: 'home-edit',
    title: 'Edit Home',
    brigade: res.locals.brigade
  })
}
