import React from "react";
import InputToDo from "../../src/components/InputToDo";
import { type Todo } from "../../src/resources/types/propsTypes.tsx";
import { mount } from "cypress/react"

describe("Testing the InputToDo Component", () => {
    //  let onAddGoalStub: Cypress.Stub;
    let onAddGoalStub: ReturnType<typeof cy.stub>;
    beforeEach(() => {
        onAddGoalStub = cy.stub();
        mount(React.createElement(InputToDo, { onAddGoal: onAddGoalStub }));
    });
    describe("Input Fields", () => {
        it("Renders the Form element with input fields", () => {
            cy.getTestById("section-title").should("have.text", "Add to your TODO List").should('be.visible');
            cy.getTestById("section-description").should("have.text", "Here you can set your goals/todo's  for the day, week, or month.").should("be.visible");
            cy.getTestById('title-input').should('be.visible');
            cy.getTestById('description-input').should('be.visible');
            cy.getTestById('due-date-input').should('be.visible');
            cy.getTestById('priority-select').should('be.visible');
            cy.getTestById('status-select').should('be.visible');
            cy.wrap(onAddGoalStub).should('not.be.called')
        });

        it("Form input fields should take input and check add button", () => {
            cy.getTestById('title-input').type('Test the todo app input');
            cy.getTestById('description-input').type('Complete Component and End to End');
            cy.getTestById('due-date-input').type('2026-06-11');
            cy.getTestById('priority-select').select('High');
            cy.getTestById('status-select').select('todo');
            cy.getTestById('add-todo').click()
            cy.wrap(onAddGoalStub).should('be.calledOnce');
            cy.wrap(onAddGoalStub).then((stub: ReturnType<typeof cy.stub>) => {
                const call = stub.getCall(0);
                const todo: Todo = call.args[0];
                expect(todo.title).to.equal('Test the todo app input');
                expect(todo.description).to.equal('Complete Component and End to End');
                expect(todo.priority).to.equal('High');
                expect(todo.status).to.equal('todo');
                expect(todo.dueDate).to.equal('2026-06-11');
                expect(todo.id).to.be.a('number');
            });
        });
        it("Check all selections of priority option", () => {
            cy.getTestById('priority-select').select('High');
            cy.getTestById('priority-select').should('have.value', 'High');
            cy.getTestById('priority-select').select('Medium');
            cy.getTestById('priority-select').should('have.value', 'Medium');
            cy.getTestById('priority-select').select('Low');
            cy.getTestById('priority-select').should('have.value', 'Low');
        })

        it('Check all options of status', () => {
            cy.getTestById('status-select').select('todo');
            cy.getTestById('status-select').should('have.value', 'todo');
            cy.getTestById('status-select').select('in-progress');
            cy.getTestById('status-select').should('have.value', 'in-progress');
            cy.getTestById('status-select').select('done');
            cy.getTestById('status-select').should('have.value', 'done');
        })
    });

    describe("Form InputToDo Component field validations", () => {
        it("When fields are empty and clicked on submit", () => {
            cy.getTestById('add-todo').click()
            cy.contains('All fields are required to add a new goal.').should('be.visible');
            cy.wrap(onAddGoalStub).should('not.be.called');
        })
        it('Should reset form after successful submission', () => {
            cy.getTestById('title-input').type('Test the todo app input');
            cy.getTestById('description-input').type('Complete Component and End to End');
            cy.getTestById('due-date-input').type('2026-06-11');
            cy.getTestById('priority-select').select('High');
            cy.getTestById('status-select').select('todo');
            cy.getTestById('add-todo').click()
            cy.wrap(onAddGoalStub).should('be.calledOnce');
            cy.get('[data-testid="title-input"]').should('have.value', '');
            cy.get('[data-testid="description-input"]').should('have.value', '');
            cy.get('[data-testid="due-date-input"]').should('have.value', '');
        })
        it('should reset all form fields after successful submission', () => {
            // Fill in complete form
            cy.get('[data-testid="title-input"]').type('Todo to Reset');
            cy.get('[data-testid="description-input"]').type('This should clear after submit');
            cy.get('[data-testid="priority-select"]').select('High');
            cy.get('[data-testid="status-select"]').select('todo');
            cy.get('[data-testid="due-date-input"]').type('2025-12-31');

            // Submit form
            cy.get('[data-testid="add-todo"]').click();

            // Verify all fields are reset
            cy.get('[data-testid="title-input"]').should('have.value', '');
            cy.get('[data-testid="description-input"]').should('have.value', '');
            cy.get('[data-testid="due-date-input"]').should('have.value', '');
            // Select fields may reset to default empty option
        });
        it('should hide error message after 3 seconds', () => {
            // Trigger error by submitting empty form
            cy.get('[data-testid="add-todo"]').click();

            // Error should be visible initially
            cy.contains('All fields are required to add a new goal.').should('be.visible');

            // Wait 3 seconds and verify error is gone
            cy.wait(3000);
            cy.contains('All fields are required to add a new goal.').should('not.exist');
        });
    });

    describe("Testing all fields are required", () => {
        it("Title is empty", () => {
            cy.get('[data-testid="description-input"]').type('Description');
            cy.get('[data-testid="priority-select"]').select('High');
            cy.get('[data-testid="status-select"]').select('todo');
            cy.get('[data-testid="add-todo"]').click();
            cy.contains('All fields are required').should('be.visible');
            cy.wrap(onAddGoalStub).should('not.be.called');
        })
        it("Description is empty", () => {
            cy.get('[data-testid="title-input"]').type('Title');
            cy.get('[data-testid="priority-select"]').select('High');
            cy.get('[data-testid="status-select"]').select('todo');
            cy.get('[data-testid="add-todo"]').click();
            cy.contains('All fields are required').should('be.visible');
            cy.wrap(onAddGoalStub).should('not.be.called');
        })
        it("Due Date is empty", () => {
            cy.get('[data-testid="title-input"]').type('Title');
            cy.get('[data-testid="description-input"]').type('Description');
            cy.get('[data-testid="priority-select"]').select('High');
            cy.get('[data-testid="status-select"]').select('todo');
            cy.get('[data-testid="add-todo"]').click();
            cy.contains('All fields are required').should('be.visible');
            cy.wrap(onAddGoalStub).should('not.be.called');
        })
    })
})