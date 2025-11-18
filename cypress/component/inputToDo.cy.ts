import React from "react";
import InputToDo from "../../src/components/InputToDo";
import { type Todo } from "../../src/resources/types/propsTypes.tsx";
import {mount} from "cypress/react"

describe("Testing the InputToDo Component", () => {
  //  let onAddGoalStub: Cypress.Stub;
 let onAddGoalStub : ReturnType<typeof cy.stub>;
    beforeEach(() => {
        onAddGoalStub = cy.stub();
         mount(React.createElement(InputToDo, { onAddGoal: onAddGoalStub }));
    });

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

    it("Form input fields should take input", () => {
        cy.getTestById('title-input').type('Test the todo app input');
        cy.getTestById('description-input').type('Complete Component and End to End');
        cy.getTestById('due-date-input').type('2026-06-11');
        cy.getTestById('priority-select').select('High');
        cy.getTestById('status-select').select('todo');
        cy.getTestById ('add-todo').click()
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

    it("When fields are empty and clicked on submit", () => {
        cy.getTestById('add-todo').click()
        cy.contains('All fields are required to add a new goal.').should('be.visible');
        cy.wrap(onAddGoalStub).should('not.be.called');
    })

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
})