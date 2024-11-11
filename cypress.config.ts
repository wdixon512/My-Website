import admin from 'firebase-admin';
import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';
import * as dotenv from 'dotenv';

require('ts-node').register({
  project: 'cypress/tsconfig.json',
});

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    // NOTE: Add "supportFile" setting if separate location is used
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
      config.env.NEXT_PUBLIC_FIREBASE_RTDB_URL = process.env.NEXT_PUBLIC_FIREBASE_RTDB_URL;
      config.env.SERVICE_ACCOUNT = process.env.SERVICE_ACCOUNT;
      config.env.TEST_UID = process.env.CYPRESS_FIREBASE_TEST_UID;
      return cypressFirebasePlugin(on, config, admin, {
        // Here is where you can pass special options.
        projectId: 'dm-helper-e7207',
        databaseURL: 'https://dm-helper-e7207-default-rtdb.firebaseio.com',
      });
    },
  },
});
