import 'cypress-axe';

const specViolations = [];

before(function () {
    cy.fixture('postcodes.json').as('postcodes');
    cy.log("Lets get started");
    cy.visit('/');
    Cypress.Cookies.defaults({
        whitelist: '_get_help_to_retrain_session'
    });
});

beforeEach(function() {
    cy.injectAxe();
    cy.configureAxe({
        rules: ['wcag21aa', 'wcag2aa', 'wcag2a'],
        reporter: "v2",
        locale: "en"
    });
});

function violationsCallBack(violations) {
    cy.url().then(function(url) {
        let violationsPage = {
            pageUrl: url,
            issues: violations
        };
        specViolations.push(violationsPage);
    });
}

function checkAccessibility() {
    if(Cypress.config('accessibility')) {
        cy.checkA11y(null, null, violationsCallBack);
    }
}

describe('Get help to retrain smoke test', function() {
   it('should open the service landing page', function() {
       checkAccessibility();
       cy.get('[data-cy=start-now-btn]').click();
   });

   it('should allow me to submit personal information', function() {
       checkAccessibility();
       cy.get('[data-cy=pid-submit-btn]').click();
       checkAccessibility();
       cy.get('[data-cy=pid-first-name-field]').type("test");
       cy.get('[data-cy=pid-surname-field]').type("test");
       cy.get('[data-cy=pid-postcode-field]').type(this.postcodes.default);
       cy.get('[data-cy=pid-dob-day-field]').type("1");
       cy.get('[data-cy=pid-dob-month-field]').type("11");
       cy.get('[data-cy=pid-dob-year-field]').type("1111");
       cy.get('[data-cy=pid-gender-male-radio-btn]').click();
       cy.get('[data-cy=pid-submit-btn]').click();
   });
   it('should take me to the GHtR task list', function() {
       // checkAccessibility();
       cy.get('h1').should('contain', 'Get help to retrain');
});

   it('should let me check my existing skills', function() {
       cy.get('[data-cy=tasklist-check-your-skills-link]').click();
       checkAccessibility();
       cy.get('[data-cy=search-field-submit-btn]').click();
       checkAccessibility();
       cy.get('[data-cy=search-field]').type("test");
       cy.get('[data-cy=search-field-submit-btn]').click();
   });

   it('should let me choose my current job', function() {
       checkAccessibility();
       cy.contains('Computer games tester').click();
   });

   it('should allow me to select my skills', function() {
       checkAccessibility();
       cy.get('[data-cy=select-skills-btn]').click();
       checkAccessibility();
       cy.get('[data-cy=find-out-what-you-can-do-btn]').click();
   });

   it('should show me the types of job I can do with my skills', function() {
       checkAccessibility();
       cy.contains('Web content manager').click();
   });

    it('should show me what a typical job would involve, and start finding a course', function() {
        checkAccessibility();
        cy.get('[data-cy=find-a-course-btn]').click();
    });

    it('should allow me to view a list of courses I could take', function() {
        checkAccessibility();
        cy.get('[data-cy=find-a-english-course-btn]').click();
    });

   it('should show me the accessibility issues', function() {
      if(specViolations.length > 0) throw specViolations;
   });
});
