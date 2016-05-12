module.exports = {
  'step one': function (browser) {
    browser
      .url('http://www.google.com')
      .waitForElementVisible('input[name="q"]', 1000)
      .setValue('input[name="q"]', 'nightwatch')
      .waitForElementVisible('input[value="Google Search"]', 1000)
  },

  'step two': function (browser) {
    browser
      .click('input[value="Google Search"]')
      .pause(1000)
      .assert.containsText('body', 'nightwatch')
      .end()
  }
}
