module.exports = function getCheckin (req, res, next) {
  res.render(res.locals.brigade.theme.slug + '/views/dashboard/index', {
    title: 'Check in',
    view: 'checkin',
    brigade: res.locals.brigade,
    user: res.locals.user
  })
}
