beforeEach(function () {
    cy.fixture('postcodes.json').as('postcodes')
})

describe('Get help to retrain smoke test', function() {
   it('should open the service landing page, submit a valid post code and display results', function() {
       cy.visit('/');
       cy.get('[data-cy=start-now-btn]').click();
       cy.get('[data-cy=postcode-field]').type(this.postcodes.default);
       cy.get('[data-cy=postcode-submit-btn]').click();
       cy.get('h1').should('contain', 'Get help to retrain');
   });
});
