import React from "react";
import InputToDo from "../../src/components/InputToDo";
import { type Todo } from "../../src/resources/types/propsTypes.tsx";


describe("Testing the InputToDo Component", () => {
    let onAddGoalStub: any;

    beforeEach(() => {
        onAddGoalStub = cy.stub();
        cy.mount(React.createElement(InputToDo, { onAddGoal: onAddGoalStub }));
    });

    it("Renders the Form element with input fields", () => {
        cy.get(".title").should("have.text", "Add to your TODO List").should('be.visible');
        cy.get(".description").should("have.text", "Here you can set your goals/todo's  for the day, week, or month.").should("be.visible");
        cy.get('input[placeholder="Title"]').should('be.visible');
        cy.get('input[placeholder="Description"]').should('be.visible');
        cy.get('input[placeholder="Due Date"]').should('be.visible');
        cy.get('select[aria-label="select priority"]').should('be.visible');
        cy.get('select[aria-label="select status"]').should('be.visible');
        cy.wrap(onAddGoalStub).should('not.be.called')
    });

    it("Form input fields should take input", () => {
        cy.get('input[placeholder="Title"]').type('Test the todo app input');
        cy.get('input[placeholder="Description"]').type('Complete Component and End to End');
        cy.get('input[placeholder="Due Date"]').type('2026-06-11');
        cy.get('select[aria-label="select priority"]').select('High');
        cy.get('select[aria-label="select status"]').select('todo');
        cy.get('button').click()
        cy.wrap(onAddGoalStub).should('be.calledOnce');
        cy.wrap(onAddGoalStub).then((stub: any) => {
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
        cy.get('button').click()
        cy.contains('All fields are required to add a new goal.').should('be.visible');
        cy.wrap(onAddGoalStub).should('not.be.called');
    })

    
})
