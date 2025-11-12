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
    }
  }
}

// Implementation
Cypress.Commands.add('verifyField', (labelFor, testId, idAttr) => {
  cy.get(`label[for="${labelFor}"]`).should('exist');
  cy.get(`[data-testid="${testId}"]`)
    .should('be.visible')
    .and('have.attr', 'id', idAttr);
});

export {}; // ensures this file is treated as a module
