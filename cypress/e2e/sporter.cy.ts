describe('Trainer login Tests', function () {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');

    cy.login('sporter@outlook.com', '@sporter2025');
  });

  it('should log in successfully and redirect to the profile page', () => {
    cy.url().should('include', '/profile');

    cy.get('h1').should('contain.text', 'sporter test');
  });

  it('test if users page is available', () => {
    cy.get('button.lg\\:hidden').click();
    cy.contains('a[href="/users"]', 'Users').should('not.exist');
  });

  it('trainers agenda niet available', () => {
    cy.get('button.lg\\:hidden').click();
    
    cy.contains('a[href="/users"]', 'Users').should('not.exist');

    cy.url().should('not.include', '/agenda');
  });
});
