/**
 * Split into declaration and initialization for better startup performance.
 */

var slug = require('slug')
var markdown = require('markdown-it')
var mdnh = require('markdown-it-named-headers')
var md = markdown({ html: true }).use(mdnh)
// markdown()


module.exports = { }
