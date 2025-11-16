/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

// import {type Todo} from "../../src/resources/types/propsTypes";
// Extend Cypress' Chainable interface for TypeScript autocomplete
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Verifies that a form field has a label, is visible,
       * and has the expected id attribute.
       * @param labelFor - the "for" attribute of the <label>
       * @param testId - the data-testid value for the input/select
       * @param idAttr - the expected id value for the field
       */
      verifyField(labelFor: string, testId: string, idAttr: string): Chainable<void>;
      getTestById(testId: string): Chainable<JQuery<HTMLElement>>;
      clearAllTodos(): Chainable<void>;
    }
  }
}

// Implementation of VerifyField
Cypress.Commands.add('verifyField', (labelFor, testId, idAttr) => {
  cy.get(`label[for="${labelFor}"]`).should('exist');
  cy.get(`[data-testid="${testId}"]`)
    .should('be.visible')
    .and('have.attr', 'id', idAttr);
});

//Implementation of getTestById for component testing

Cypress.Commands.add('getTestById', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`)
})

// Custom command to delete all todos (for test cleanup)
Cypress.Commands.add('clearAllTodos', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('todos');
  });
  cy.reload();
});


export {}; // ensures this file is treated as a module

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