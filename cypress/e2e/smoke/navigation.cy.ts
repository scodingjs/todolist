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
    cy.get('[data-testid="navbar"').should('be.visible');
    cy.get('[data-testid="navbar-brand"').should('be.visible');
    cy.get('[data-testid="app-title"').should('have.text', 'ToDo List');
    cy.get('[data-testid="app-logo"').should('be.visible')
      .should('have.attr', 'src')
      .and('include', '/src/assets/todo.png')
    cy.get('[data-testid="app-logo"').should('have.attr', 'alt', 'App Icon');
  });


  it('should display section with title with lazy loading', () => {
    // Step 1: Assert that the fallback appears
    cy.contains("Loading To Do's").should('be.visible')

    // Step 2: Wait for the lazy component to finish loading
    cy.contains("Loading To Do's").should('not.exist')


    cy.get('[data-testid="section-title"]',{ timeout: 5000 }).should('have.text', 'Add to your TODO List')
    cy.get('[data-testid="section-description"]')
      .first()
      .invoke('text')
      .then((text) => {
        const normalized = text.replace(/\s+/g, ' ').trim();
        expect(normalized).to.eq("Here you can set your goals/todo's for the day, week, or month.");
      });
  });

  // it('should display form element', () => {
  //   cy.get('[data-testid="todo-form"]').should('be.visible');
  //   cy.get('label').first().should('have.attr', "for", "title");
  //   cy.get('input').first().should('have.attr', "id", "title");
  //   cy.get('label').eq(1).should('have.attr', "for", "description");
  //   cy.get('input').eq(1).should('have.attr', "id", "description");
  //   cy.get('label').eq(2).should('have.attr', "for", "priority");
  //   cy.get('select').eq(0).should('have.attr', "id", "priority");
  //   cy.get('label').eq(3).should('have.attr', "for", "status");
  //   cy.get('select').eq(1).should('have.attr', "id", "status");
  //   cy.get('label').last().should('have.attr', "for", "dueDate");
  //   cy.get('input').last().should('have.attr', "id", "dueDate");
  //   cy.contains('Add Goal').should('be.visible');
  // });
  // it('should display form elements', () => {
  //   cy.get('[data-testid=\"todo-form\"]').should('be.visible');
  //   cy.get('label[for="title"]').should('exist');
  //   cy.get('[data-testid=\"title-input\"]').should('be.visible').and('have.attr', "id", "title");
  //   cy.get('label[for="description"]').should('exist');
  //   cy.get('[data-testid=\"description-input\"]').should('be.visible').and('have.attr', "id", "description");
  //   cy.get('label[for="priority"]').should('exist');
  //   cy.get('[data-testid=\"priority-select\"]').should('be.visible').and('have.attr', "id", "priority");
  //   cy.get('label[for="status"]').should('exist');
  //   cy.get('[data-testid=\"status-select\"]').should('be.visible').and('have.attr', "id", "status");
  //   cy.get('label[for="dueDate"]').should('exist');
  //   cy.get('[data-testid=\"due-date-input\"]').should('be.visible').and('have.attr', "id", "dueDate");
  //   cy.get('[data-testid=\"add-todo\"]').should('be.visible');
  // });

  it('should display form elements', () => {
    cy.get('[data-testid="todo-form"]',{timeout:5000}).should('be.visible');

    cy.verifyField('title', 'title-input', 'title');
    cy.verifyField('description', 'description-input', 'description');
    cy.verifyField('priority', 'priority-select', 'priority');
    cy.verifyField('status', 'status-select', 'status');
    cy.verifyField('dueDate', 'due-date-input', 'dueDate');

    cy.get('[data-testid="add-todo"]').should('be.visible');
  });


  it('should have a responsive layout', () => {
    // Test desktop
    // cy.viewport(1920, 1080);
    // cy.contains('ToDo List').should('be.visible');

    // Test tablet
    // cy.viewport(768, 1024);
    // cy.contains('ToDo List').should('be.visible');

    // Test mobile
    // cy.viewport(375, 667);
    // cy.contains('ToDo List').should('be.visible');

    const viewPorts: Array<[number, number]> = [
      [1920, 1080],
      [768, 1024],
      [375, 667]
    ]

    viewPorts.forEach(([width, height]) => {
      cy.viewport(width, height);
      cy.get('[data-testid="app-title"]').
        should('be.visible').and('have.text', 'ToDo List');
    });
  });

});