const Checkins = require('../../models/Checkins')

module.exports = function getCheckin (req, res, next) {
  const formResponse = req.body
  formResponse.mailingList = formResponse.mailingList === 'mailingList'
  formResponse.date = new Date()
  const lead = {}
  for (let field in formResponse) {
    if (field.indexOf('expectedAttendance-') > -1) {
      const teamName = field.split('expectedAttendance-')[1]
      lead[teamName] = lead[teamName] || {}
      lead[teamName].expectedAttendance = formResponse[field]
    }
    if (field.indexOf('reserve-') > -1) {
      const teamName = field.split('reserve-')[1]
      lead[teamName] = lead[teamName] || {}
      lead[teamName].reserve = formResponse[field]
    }
  }
  formResponse.lead = lead
  const checkin = new Checkins(formResponse)
  checkin.save((err, checkin) => {
    if (err) {
      req.flash('error', { msg: 'An error occured while checkin in. Please notify a core team member.' })
      return res.redirect('/checkin')
    }
    req.flash('success', { msg: 'Thank you for checking in!' })
    res.redirect('/')
  })
}
