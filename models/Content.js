var mongoose = require('mongoose')

var contentSchema = new mongoose.Schema({
  type: String,
  lastModified: Date,
  modAudit: Array,
  content: {
    title: String,
    date: Date,

  }

})

module.exports = mongoose.model('Content', contentSchema)
