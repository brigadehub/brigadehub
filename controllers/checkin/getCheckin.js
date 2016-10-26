const defaultSkills = require('../../config/defaultSkills.json')
const defaultLocations = require('../../config/defaultLocations.json')
const defaultReferredBy = require('../../config/defaultReferredBy.json')
// TODO(therebelrobot): Move these into manage checkin page


module.exports = function getCheckin (req, res, next) {
  res.render(res.locals.brigade.theme.slug + '/views/checkin/index', {
    title: 'Check in',
    view: 'checkin',
    brigade: res.locals.brigade,
    user: user || {},
    locations: defaultLocations,
    skills: defaultSkills,
    referredBy: defaultReferredBy
  })
}
