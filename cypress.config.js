const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1800,
  viewportHeight: 1400,

  watchForFileChanges: false,

  e2e: {
    baseUrl: "http://localhost:4200",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
