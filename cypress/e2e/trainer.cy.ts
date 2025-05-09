describe('Trainer login Tests', function () {
  beforeEach(() => {
    cy.visit('/');

    cy.login('trainer@outlook.com', '@trainer2025');

  });

  it('should log in successfully and redirect to the profile page', () => {
    cy.url().should('include', '/profile');

    cy.get('h1').should('contain.text', 'trainer test');
  });

  it('cannot navigate to users', () => {
    cy.get('button.lg\\:hidden').click();
    cy.contains('a[href="/users"]', 'Users').should('not.exist');
  });

  it('can navigate to agenda', () => {
    cy.get('button.lg\\:hidden').click();

    cy.get('a[href="/agenda"]').click();

    cy.contains('h1', 'Agenda');
  });

  it('can navigate to trainer agenda', () => {
    cy.get('button.lg\\:hidden').click();

    cy.get('a[href="/agenda-trainers"]').click();

    cy.contains('h1', 'Agenda');

    cy.contains('button', 'Add Training').should('not.exist');
  });

  it('cannot add training to trainer agenda', () => {
    cy.get('button.lg\\:hidden').click();

    cy.get('a[href="/agenda-trainers"]').click();

    cy.contains('h1', 'Agenda');

    cy.get('a[href="/training/create"]').should('not.exist');
  });
});
