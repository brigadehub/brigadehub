const core = require('brigadehub-core')
var pkg = require('./package.json')

const bhConfig = {
  dotenv: require('./dotenv')(),
  info: '[Brigadehub]',
  version: pkg.version
}
core(bhConfig)
