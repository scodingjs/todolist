"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("cypress/react");
describe('Check rendering of all todo\'s list component', () => {
    it('Render the default todo list', () => {
        (0, react_1.mount)(/>);
        cy.get('h3').should('have.text', 'High');
        cy.get('p').should('have.text', 'TODO');
        // Get the card footer
        cy.get('.card-footer').should('exist').and('be.visible');
        // Check it has exactly 2 buttons
        cy.get('.card-footer button').should('have.length', 2);
        // Check the text of each button
        cy.get('.card-footer button').first().should('have.text', 'Edit');
        cy.get('.card-footer button').last().should('have.text', 'Delete');
        //Check both buttons are visible and clickable
        cy.contains('button', 'Edit').should('be.visible').click();
        cy.contains('button', 'Delete').should('be.visible').click();
    });
});
