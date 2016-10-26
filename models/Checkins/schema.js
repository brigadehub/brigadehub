module.exports = {
  date: { type: Date },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  githubUsername: { type: String, default: '' }, // if present, sync to user model
  teams: { type: Array, default: [] },
  mailingList: { type: Boolean, default: false },
  referredBy: { type: String, default: '' },
  skills: { type: Array, default: [] },
  lead: {
    expectedAttendance: { type: Number, default: 0 },
    reserve: { type: String, default: '' }
  }
}
