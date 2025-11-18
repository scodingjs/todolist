/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

import { type Todo } from "../../src/resources/types/propsTypes";

// Implementation of VerifyField
Cypress.Commands.add('verifyField', (labelFor, testId, idAttr) => {
  cy.get(`label[for="${labelFor}"]`).should('exist');
  cy.get(`[data-testid="${testId}"]`)
    .should('be.visible')
    .and('have.attr', 'id', idAttr);
});

//Implementation of getTestById for component testing

Cypress.Commands.add('getTestById', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`).should("exist")
})

// Custom command to delete all todos (for test cleanup)
Cypress.Commands.add('clearAllTodos', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('todos');
  });
  cy.reload();
});

// Custom command to perform TODO add operation

Cypress.Commands.add('addTodo', (todo: Todo) => {
  cy.getTestById('title-input').type(todo.title);
  cy.getTestById('description-input').type(todo.description);
  const dueDateStr = todo.dueDate instanceof Date ? todo.dueDate.toISOString().slice(0, 10) : todo.dueDate;
  cy.getTestById('due-date-input').type(dueDateStr);
  cy.getTestById('priority-select').select(todo.priority);
  cy.getTestById('status-select').select(todo.status);
  cy.getTestById('add-todo').click()
})

export { }; // ensures this file is treated as a module

// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }