const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,

  e2e: {
    baseUrl: "http://localhost:4200",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
