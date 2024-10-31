// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  apiKey: 'AIzaSyBk0kM-gOoO21l7sDOD50c6ErxsYYiZ1FE',
  authDomain: 'dm-helper-e7207.firebaseapp.com',
  projectId: 'dm-helper-e7207',
  storageBucket: 'dm-helper-e7207.appspot.com',
  messagingSenderId: '778480457827',
  appId: '1:778480457827:web:a854efc49001ad24818056',
  measurementId: 'G-WZ4Q08Q2YB',
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
