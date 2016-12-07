const mongoose = require('mongoose')

module.exports = function (cb) {
  let brigadeDetails
  mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI, function (err) {
    if (err) throw new Error(err)
  })
  mongoose.connection.on('error', function (err) {
    console.log('There was an error while trying to connect!')
    throw new Error(err)
  })

  /**
   * Check Model Settings in db
   */
  var Brigade = require('../models/Brigade')

  /**
   * Check if brigade exists before starting Express server.
   */
  Brigade.findOne({}, function (err, results) {
    if (err) throw err
    if (!results) {
      var defaultBrigadeData = require('../seeds/Brigade')()[0]
      defaultBrigadeData.slug = process.env.BRIGADE
      brigadeDetails = defaultBrigadeData
      var defaultBrigade = new Brigade(defaultBrigadeData)
      defaultBrigade.save(function (err) {
        if (err) throw err
        process.env.DB_INSTANTIATED = true
        cb(brigadeDetails)
      })
    } else {
      process.env.DB_INSTANTIATED = true
      brigadeDetails = results
      cb(brigadeDetails)
    }
  })
}
