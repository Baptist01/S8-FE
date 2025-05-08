describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
})

describe('Home Page Tests', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should successfully load the home page', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('should display the correct title', () => {
    cy.get('app-title').should('contain.text', 'Welkom bij Now or Never Sports');
  });

  it('should display the navigation bar', () => {
    cy.get('nav').should('exist');
    cy.get('nav a').should('have.length.greaterThan', 0); // Ensure there are links in the navbar
  });

  it('should display the contact button', () => {
    cy.get('app-contact-button').should('exist');
  });

  it('should display the sport overview section', () => {
    cy.get('section').contains('Personal training').should('exist');
    cy.get('section').contains('Boxing').should('exist');
    cy.get('section').contains('Bootcamp').should('exist');
  });

  it('should navigate to the personal training page when the link is clicked', () => {
    cy.get('button.lg\\:hidden').click();
    cy.get('a[href="/personal-training"]').click();
    cy.url().should('include', '/personal-training');
  });

  it('should navigate to the professional personal training page when the link is clicked', () => {
    cy.get('button.lg\\:hidden').click();
    cy.get('a[href="/professional-personal-training"]').click();
    cy.url().should('include', '/professional-personal-training');
  });
});