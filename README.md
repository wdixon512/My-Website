# My-Website

Will Dixon's personal website, built with NextJS and ChakraUI!

# Testing

1. Run `npm install`
2. Run `npm install -g firebase-tools`
3. Run `firebase login` to login to database
4. Run `firebase init emulators`. Choose Auth and Firestore emulators
5. Run `firebase emulators:start --only firestore`
6. Run `npm test` in another terminal tab

# Cypress Testing

1. Run `npx cypress open`
2. For tests that require checks against the database after some interaction, make sure your local .env file has the `SERVICE_ACCOUNT` entry in it. See https://www.npmjs.com/package/cypress-firebase setup for further instruction on what this .env entry should be set to (it's a JSON object, and has to be on 1 LINE).
3. You will also need to set `CYPRESS_FIREBASE_TEST_UID` to the UID for one of your google accounts.
