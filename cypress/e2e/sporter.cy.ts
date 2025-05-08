describe('Trainer login Tests', function () {
    beforeEach(() => {
      // Visit the home page before each test
      cy.visit('/');
    });
  
    it('should log in successfully and redirect to the profile page', () => {
      // Use the custom login command
      cy.login('sporter@outlook.com', '@sporter2025');
  
      // Verify that the user is redirected to the profile page
      cy.url().should('include', '/profile');
  
      // Optionally, verify that the profile page contains expected content
      cy.get('h1').should('contain.text', 'sporter test');
    });
  });