describe('Public Routes', () => {
  it('Should load the login page', () => {
    cy.visit('/login');
    cy.contains('Login');
  });

  it('Should load the sign-up page', () => {
    cy.visit('/opret-konto');
    cy.contains('Opret Bruger');
  });
});

describe('Protected Routes - Tenant', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/role', { body: 'ROLE_TENANT' }).as('mockRoleTenant');
  });

  it('Should redirect to the tenant home page if logged in', () => {
    cy.visit('/');
    cy.url().should('include', '/hjem');
  });

  it('Should load the contact page for tenants', () => {
    cy.visit('/kontakt');
    cy.contains('Kontakt');
  });

  it('Should load the tenant bookings page', () => {
    cy.visit('/mine-reservationer');
    cy.contains('Mine Reservationer');
  });
});

describe('Protected Routes - Admin', () => {
  localStorage.setItem('jwt', 'your-mock-token');
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/role', { body: 'ROLE_ADMIN' }).as('mockRoleAdmin');
  });

  it('Should redirect to the admin home page if logged in', () => {
    cy.visit('/');
    cy.url().should('include', '/admin-overblik');
  });

  it('Should load the resource overview page for admins', () => {
    cy.visit('/ressource-overblik');
    cy.contains('Ressource Oversigt');
  });

  it('Should load the tenant overview page for admins', () => {
    cy.visit('/beboer-overblik');
    cy.contains('Beboer Oversigt');
  });

  it('Should load the admin overview page', () => {
    cy.visit('/admin-overblik');
    cy.contains('Admin Oversigt');
  });
});

describe('Fallback Route', () => {
  it('Should show a not-found page for unknown routes', () => {
    cy.visit('/unknown-path');
    cy.contains('findes ikke');
  });
});
