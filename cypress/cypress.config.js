const { defineConfig } = require("cypress")

module.exports = defineConfig({
  videosFolder: "videos",
  fixturesFolder: "fixtures",
  downloadsFolder: "downloads",
  screenshotsFolder: "screenshots",
  video: true,
  projectId: "webpage-aleph",
  e2e: {
    supportFile: false,
    specPattern: "tests/**/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
