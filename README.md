# Get Help to Retrain smoke tests

## Prerequisites

- Node
- NPM
- Chrome

## Running tests

Default run is against QA environment.  This can be adjusted in `cypress.json` if required.

Additional postcodes can be added to the `cypress/fixtures/postcodes.json`

Running tests interactively can be done with the following commands:

`npm install`

`npm run cypress:open`

Running from CI/non-interactively:

`npm run cypress:run`
