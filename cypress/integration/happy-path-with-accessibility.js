import 'cypress-axe';

const specViolations = [];

before(function () {
  cy.fixture('postcodes.json').as('postcodes');
  cy.log("Lets get started");
  cy.visit('/');
  Cypress.Cookies.defaults({
    whitelist: ['_get_help_to_retrain_session', 'seen_cookie_message']
  });

  cy.contains('Accept cookies').click();
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
    cy.injectAxe();
    cy.checkA11y(null, null, violationsCallBack);
  }
}

describe('Get help to retrain smoke test', function() {
  it('should open the service landing page', function() {
    checkAccessibility();
  });

  it('should allow me to view the personal information form', function() {
    cy.get('[data-cy=start-now-btn]').click();
    checkAccessibility();
  });

  it('should allow me to see form errors on personal information form', function() {
    cy.get('[data-cy=pid-submit-btn]').click();
    checkAccessibility();
  });

  it('should allow me to submit personal information and navigate to task list', function() {
    cy.get('[data-cy=pid-first-name-field]').type("test");
    cy.get('[data-cy=pid-surname-field]').type("test");
    cy.get('[data-cy=pid-postcode-field]').type(this.postcodes.default);
    cy.get('[data-cy=pid-dob-day-field]').type("1");
    cy.get('[data-cy=pid-dob-month-field]').type("11");
    cy.get('[data-cy=pid-dob-year-field]').type("1111");
    cy.get('[data-cy=pid-gender-male-radio-btn]').click();
    cy.get('[data-cy=pid-submit-btn]').click();
    checkAccessibility();
  });

  it('should allow me to navigate to check my existing skills', function() {
    cy.get('[data-cy=tasklist-check-your-skills-link]').click();
    checkAccessibility();
  });


  it('should allow me to see form errors on check my existing skills', function() {
    cy.get('[data-cy=search-field-submit-btn]').click();
    checkAccessibility();
  });

  it('should allow me to check my existing skills', function() {
    cy.get('[data-cy=search-field]').type("test");
    cy.get('[data-cy=search-field-submit-btn]').click();
    checkAccessibility();
  });

  it('should allow me to choose my current job', function() {
    cy.contains('Computer games tester').click();
    checkAccessibility();
  });

  it('should allow me to select my skills', function() {
    cy.get('[data-cy=select-skills-btn]').click();
    checkAccessibility();
  });

  it('should show me the types of job I can do with my skills', function() {
    cy.get('[data-cy=find-out-what-you-can-do-btn]').click();
    checkAccessibility();
  });

  it('should show me what a typical job would involve', function() {
    cy.contains('Web content manager').click();
    checkAccessibility();
  });

  it('should allow me to target a job', function() {
    cy.contains('Target this type of work').click();
    checkAccessibility();
  });

  it('should allow me to choose training options', function() {
    cy.get('[id="training_english_skills"]').check()
    cy.get('[id="training_math_skills"]').check()
    cy.contains('Continue').click();
    checkAccessibility();
  });

  it('should allow me to choose computer skills training options', function() {
    cy.get('[id="it_training_computer_skills"]').check()   
    cy.contains('Continue').click();
    checkAccessibility();
  });

  it('should allow me to choose job hunting advice and navigate to action plan', function() {
    cy.get('[id="job_hunting_cv"]').check();
    cy.get('[id="job_hunting_cover_letter"').check();
    cy.get('[id="job_hunting_interviews"]').check(); 
    cy.contains('Continue').click();
    checkAccessibility();
  });

  it('should allow me to find jobs near me', function() {
    cy.contains('Show jobs near me').click();
    checkAccessibility();
  });

  it('should allow me to find an maths course', function() {
    cy.go('back')
    cy.contains('Find a maths course').click()
    checkAccessibility();
  });

  it('should allow me to find an English course', function() {
    cy.go('back')
    cy.contains('Find an English course').click()
    checkAccessibility();
  });

  it('should allow me to get CV advice', function() {
    cy.go('back')
    cy.contains('Get CV advice').click()
    checkAccessibility();
  });

  it('should allow me to get cover letter advice', function() {
    cy.go('back')
    cy.contains('Get cover letter advice').click()
    checkAccessibility();
  });
  
   it('should allow me to get interview advice', function() {
    cy.go('back')
    cy.contains('Get interview advice').click()
    checkAccessibility();
  });

  it('should allow me to find local schemes and offers', function() {
    cy.go('back')
    cy.contains('Show me local offers').click()
    checkAccessibility();
  });

  it('should allow me to save my results', function() {
    cy.get('a[href="/save-your-results"]').click()
    cy.get('[id="email"]').type('test@test.com')
    checkAccessibility();
  });

  it('should allow me to see I have saved my results', function() {
    cy.contains('Save your progress').click()
    checkAccessibility();
  });

  it('should show me the accessibility issues', function() {
    if(specViolations.length > 0) throw specViolations;
  });
});
