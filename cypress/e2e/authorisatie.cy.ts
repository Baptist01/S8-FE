describe('admin', function () {
  beforeEach(() => {
    cy.visit('/');

    cy.login('admin@outlook.com', '@Admin2025');
  });

  it('should log in successfully and redirect to the profile page', () => {
    cy.url().should('include', '/profile');

    cy.get('h1').should('contain.text', 'Admin test');
  });

  it('test if users page is available', () => {
    cy.get('button.lg\\:hidden').click();

    cy.get('a[href="/users"]').click();

    cy.contains('h1', 'Users').should('be.visible');
  });

  it('can add training to trainer agenda', () => {
    cy.get('button.lg\\:hidden').click();

    cy.get('a[href="/agenda-trainers"]').click();

    cy.contains('h1', 'Agenda');

    cy.get('a[href="/training/create"]').should('be.visible');
  });

  it('can navigate to agenda', () => {
    cy.get('button.lg\\:hidden').click();

    cy.get('a[href="/agenda"]').click();

    cy.contains('h1', 'Agenda');
  });
});

describe('Headcoach', function () {
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

  it('cannot add training to trainer agenda', () => {
    cy.get('button.lg\\:hidden').click();

    cy.get('a[href="/agenda-trainers"]').click();

    cy.contains('h1', 'Agenda');

    cy.get('a[href="/training/create"]').should('be.visible');
  });

  it('can navigate to agenda', () => {
    cy.get('button.lg\\:hidden').click();

    cy.get('a[href="/agenda"]').click();

    cy.contains('h1', 'Agenda');
  });
});

describe('Trainer', function () {
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

describe('sporter', function () {
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
