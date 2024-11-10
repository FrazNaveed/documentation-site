const { defineConfig } = require("cypress")

module.exports = defineConfig({
  videosFolder: "videos",
  fixturesFolder: "fixtures",
  downloadsFolder: "downloads",
  screenshotsFolder: "screenshots",
  e2e: {
    supportFile: false,
    specPattern: "tests/**/*.cy.js",
    // macbook-15 - https://docs.cypress.io/api/commands/viewport#Arguments
    viewportWidth: 1440,
    viewportHeight: 900,
  },
});
