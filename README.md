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

Running e2e journey:

The E2E journey integrates Axe accessibility audits.  The audits can be enabled or disabled with the 
accessibility field in the `cypress.json`.

`npm run cypress:run --spec "cypress/integration/happy-path-with-accessibility.js"`

Running from CI/non-interactively:

`npm run cypress:run --spec "cypress/integration/smoke-test.js"`
