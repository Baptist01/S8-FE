/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in a user.
     * @param email - The user's email address.
     * @param password - The user's password.
     */
    login(email: string, password: string): Chainable<void>;
  }
}

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');

  cy.get('button.lg\\:hidden').click();

  cy.get('a').contains('login').click();

  // Fill in the login form
  cy.origin(
    'http://localhost:9011/oauth2/',
    { args: { email, password } },
    ({ email, password }) => {
      cy.get('input#loginId').type(email);
      cy.get('input#password').type(password);

      // Click the login button
      cy.get('button.blue.button').click();
    },
  );
  cy.url().should('include', '/profile');
});
