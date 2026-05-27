import { defineConfig } from 'cypress';
import { plugin as registerGrepPlugin } from '@cypress/grep/plugin';
import { allureCypress } from 'allure-cypress/reporter';

export default defineConfig({
  expose: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },

  e2e: {
    baseUrl: 'https://automationteststore.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',

    screenshotsFolder: 'reports/screenshots',
    videosFolder: 'reports/videos',
    downloadsFolder: 'reports/downloads',

    video: true,
    screenshotOnRunFailure: true,

    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    responseTimeout: 15000,

    viewportWidth: 1440,
    viewportHeight: 900,

    retries: {
      runMode: 1,
      openMode: 0,
    },

    setupNodeEvents(on, config) {
      registerGrepPlugin(config);

      allureCypress(on, config, {
        resultsDir: 'reports/allure-results',
      });

      return config;
    },
  },
});
