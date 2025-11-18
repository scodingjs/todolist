
import { type Todo } from "../../src/resources/types/propsTypes";
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
           addTodo(todo: Todo): Chainable<void>
        }
    }
}
export {};