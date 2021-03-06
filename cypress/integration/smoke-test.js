beforeEach(function () {
  cy.fixture('postcodes.json').as('postcodes')
  Cypress.Cookies.defaults({
    whitelist: ['_get_help_to_retrain_session']
  });
})

before(function() {
  cy.clearCookie('_get_help_to_retrain_session');
  cy.clearLocalStorage();
})

describe('Get help to retrain smoke test', function() {
  it('should open the service landing page, submits PID information and display results', function() {
    cy.visit('/');
    cy.contains('Accept necessary cookies only').click();

    cy.get('[data-cy=start-now-btn]').click();
    cy.get('[data-cy=pid-first-name-field]').type("test");
    cy.get('[data-cy=pid-surname-field]').type("test");
    cy.get('[data-cy=pid-postcode-field]').type(this.postcodes.default);
    cy.get('[data-cy=pid-dob-day-field]').type("1");
    cy.get('[data-cy=pid-dob-month-field]').type("11");
    cy.get('[data-cy=pid-dob-year-field]').type("2000");
    cy.get('[data-cy=pid-gender-male-radio-btn]').click();
    cy.get('[data-cy=pid-submit-btn]').click();
    cy.get('h1').should('contain', 'Step-by-step guide to changing types of work');
  });
});
