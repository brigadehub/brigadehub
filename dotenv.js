var dotenv = require('dotenv')
var path = require('path')
var fs = require('fs')

module.exports = function () {
  try {
    var stats = fs.lstatSync(path.join(__dirname, '/.env'))
    if (stats.isFile()) {
      dotenv.load({ path: '.env' })
    } else {
      throw new Error('.env is not a file!')
    }
  } catch (e) {
    console.warn(e)
    console.warn('.env file not found. Defaulting to sample. Please copy .env.example to .env and populate with your own credentials.')
    dotenv.load({ path: '.env.example' })
  }
}
