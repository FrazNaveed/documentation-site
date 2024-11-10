const { defineConfig } = require("cypress")

module.exports = defineConfig({
  videosFolder: "videos",
  fixturesFolder: "fixtures",
  downloadsFolder: "downloads",
  screenshotsFolder: "screenshots",
  video: true,
  e2e: {
    supportFile: false,
    specPattern: "tests/**/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
