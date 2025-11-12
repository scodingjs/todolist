describe('Page Navigation and Layout', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // it('should load the homepage successfully', () => {
  //   cy.url().should('include', 'localhost:5173');
  // });
  it('should load the homepage successfully', () => {
    cy.location('pathname').should('eq', '/');
    // Or verify status code
    cy.request('/').its('status').should('eq', 200);
  });
  it('should display navbar and icon', () => {
    cy.get('nav').should('be.visible');
    cy.get('.navbar-brand').should('be.visible');
    cy.get('h1').should('have.text', 'ToDo List');
    cy.get('img').should('be.visible')
      .should('have.attr', 'src')
      .and('include', '/src/assets/todo.png')
    cy.get('img').should('have.attr', 'alt', 'App Icon');
  });


  it('should display section with title with lazy loading', () => {
    // Step 1: Assert that the fallback appears
    cy.contains("Loading To Do's").should('be.visible')

    // Step 2: Wait for the lazy component to finish loading
    cy.contains("Loading To Do's").should('not.exist')
    cy.get('h2').should('have.text', 'Add to your TODO List')
    cy.get('p')
      .first()
      .invoke('text')
      .then((text) => {
        const normalized = text.replace(/\s+/g, ' ').trim();
        expect(normalized).to.eq("Here you can set your goals/todo's for the day, week, or month.");
      });
  });

  it('should display form element', () => {
    cy.get('form').should('be.visible');
    cy.get('label').first().should('have.attr', "for", "title");
    cy.get('input').first().should('have.attr', "id", "title");
    cy.get('label').eq(1).should('have.attr', "for", "description");
    cy.get('input').eq(1).should('have.attr', "id", "description");
    cy.get('label').eq(2).should('have.attr', "for", "priority");
    cy.get('select').eq(0).should('have.attr', "id", "priority");
    cy.get('label').eq(3).should('have.attr', "for", "status");
    cy.get('select').eq(1).should('have.attr', "id", "status");
    cy.get('label').last().should('have.attr', "for", "dueDate");
    cy.get('input').last().should('have.attr', "id", "dueDate");
    cy.contains('Add Goal').should('be.visible');
  });

  it('should have responsive layout', () => {
    // Test desktop
    cy.viewport(1920, 1080);
    cy.contains('ToDo List').should('be.visible');

    // Test tablet
    cy.viewport(768, 1024);
    cy.contains('ToDo List').should('be.visible');

    // Test mobile
    cy.viewport(375, 667);
    cy.contains('ToDo List').should('be.visible');
  });

});