describe('Trainer login Tests', function () {
    beforeEach(() => {
      cy.visit('/');

      cy.login('headcoach@outlook.com', '@headcoach2025');

    });
  
    it('should log in successfully and redirect to the profile page', () => {
      cy.url().should('include', '/profile');
  
      cy.get('h1').should('contain.text', 'headcoach test');
    });

    it('cannot add training to trainer agenda', () => {
      cy.get('button.lg\\:hidden').click();
  
      cy.get('a[href="/agenda-trainers"]').click();
  
      cy.contains('h1', 'Agenda');
  
      cy.get('a[href="/training/create"]').should('be.visible');
      
    });
  });