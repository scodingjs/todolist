"use strict";
describe('Page Navigation and Layout', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('should load the homepage successfully', () => {
        cy.url().should('include', 'localhost:5173');
    });
    it('should display navbar and icon', () => {
        cy.get('nav').should('be.visible');
        cy.get('.navbar-brand').should('be.visible');
        cy.get('h1').should('have.text', 'ToDo List');
        cy.get('img').should('be.visible')
            .should('have.attr', 'src')
            .and('include', '/src/assets/todo.png');
        cy.get('img').should('have.attr', 'alt', 'App Icon');
    });
    it('should display section with title', () => {
        cy.contains('section').should('be.visible');
        cy.get('h1').should('have.text', 'Add to your TODO List');
        cy.get('p').should('be.visible').should('have.text', "Here you can set your goals/todo's for the day, week, or month.");
    });
    it('should display form element', () => {
        cy.get('form').should('be.visible');
        cy.get('label').should('have.attr', "for", "title");
        cy.get('input').should('have.attr', "id", "title");
        cy.get('label').should('have.attr', "for", "description");
        cy.get('input').should('have.attr', "id", "description");
        cy.get('label').should('have.attr', "for", "priority");
        cy.get('input').should('have.attr', "id", "priority");
        cy.get('label').should('have.attr', "for", "status");
        cy.get('input').should('have.attr', "id", "status");
        cy.get('label').should('have.attr', "for", "dueDate");
        cy.get('input').should('have.attr', "id", "dueDate");
        cy.contains('Add Goal').should('be.visible');
    });
    it('should have scroll indicator', () => {
        cy.get('.animate-bounce').should('be.visible');
    });
    it('should display footer', () => {
        cy.scrollTo('bottom');
        cy.contains('React Timing').should('be.visible');
        cy.contains('Built with').should('be.visible');
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
