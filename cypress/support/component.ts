// cypress/support/component.ts
import './commands';   // import custom Cypress commands
import { mount } from 'cypress/react';

// add TypeScript declaration for custom 'mount' command
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);

// Optionally, set global hooks
beforeEach(() => {
  cy.log('Starting test...');
});

export {};
