// cypress/support/component.ts
import './commands';   // import custom Cypress commands
import { mount } from 'cypress/react';
/* eslint-disable @typescript-eslint/no-namespace */
//add TypeScript declaration for custom 'mount' command
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

/*
declare module 'cypress'{
  interface Chainable{
    mount: typeof mount;
  }
}
This option of module augmentation fix doesn't work,
Cypress exports a global namespace, not a module. TypeScript does not allow augmentation of an entity that is not a module, resulting in the error:

Cannot augment module 'cypress' because it resolves to a non-module entity
*/
Cypress.Commands.add('mount', mount);

// Optionally, set global hooks
beforeEach(() => {
  cy.log('Starting test...');
});

export {};