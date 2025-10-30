import React from 'react';
import InputToDo from './InputToDo';
import { Todo } from '../resources/types/propsTypes';
import 'bootstrap/dist/css/bootstrap.min.css';

describe('InputToDo Component Tests', () => {
  let onAddGoalStub: Cypress.Agent<sinon.SinonStub>;

  beforeEach(() => {
    onAddGoalStub = cy.stub();
  });

  it('should render the component with all form fields', () => {
    cy.mount(<InputToDo onAddGoal={onAddGoalStub} />);

    // Check if title and description are present
    cy.contains('Add to your TODO List').should('be.visible');
    cy.contains('Here you can set your goals/todo\'s  for the day, week, or month.').should('be.visible');

    // Check all form fields are rendered
    cy.get('[data-testid="title-input"]').should('be.visible');
    cy.get('[data-testid="description-input"]').should('be.visible');
    cy.get('[data-testid="priority-select"]').should('be.visible');
    cy.get('[data-testid="status-select"]').should('be.visible');
    cy.get('[data-testid="dueDate-input"]').should('be.visible');
    cy.get('[data-testid="submit-button"]').should('be.visible').and('contain', 'Add Goal');
  });

  it('should accept input in all form fields', () => {
    cy.mount(<InputToDo onAddGoal={onAddGoalStub} />);

    // Fill in the form
    cy.get('[data-testid="title-input"]').type('Test Todo Title');
    cy.get('[data-testid="description-input"]').type('Test Todo Description');
    cy.get('[data-testid="priority-select"]').select('High');
    cy.get('[data-testid="status-select"]').select('todo');
    cy.get('[data-testid="dueDate-input"]').type('2025-12-31');

    // Verify values
    cy.get('[data-testid="title-input"]').should('have.value', 'Test Todo Title');
    cy.get('[data-testid="description-input"]').should('have.value', 'Test Todo Description');
    cy.get('[data-testid="priority-select"]').should('have.value', 'High');
    cy.get('[data-testid="status-select"]').should('have.value', 'todo');
    cy.get('[data-testid="dueDate-input"]').should('have.value', '2025-12-31');
  });

  it('should show error message when submitting empty form', () => {
    cy.mount(<InputToDo onAddGoal={onAddGoalStub} />);

    // Submit empty form
    cy.get('[data-testid="submit-button"]').click();

    // Check error message is displayed
    cy.contains('All fields are required to add a new goal.').should('be.visible');

    // Verify onAddGoal was not called
    cy.wrap(onAddGoalStub).should('not.be.called');
  });

  it('should show error message when only some fields are filled', () => {
    cy.mount(<InputToDo onAddGoal={onAddGoalStub} />);

    // Fill only title and description
    cy.get('[data-testid="title-input"]').type('Partial Todo');
    cy.get('[data-testid="description-input"]').type('Only two fields filled');

    // Submit form
    cy.get('[data-testid="submit-button"]').click();

    // Check error message is displayed
    cy.contains('All fields are required to add a new goal.').should('be.visible');

    // Verify onAddGoal was not called
    cy.wrap(onAddGoalStub).should('not.be.called');
  });

  it('should call onAddGoal with correct data when form is valid and submitted', () => {
    cy.mount(<InputToDo onAddGoal={onAddGoalStub} />);

    // Fill in complete form
    cy.get('[data-testid="title-input"]').type('Complete Todo');
    cy.get('[data-testid="description-input"]').type('This is a complete todo item');
    cy.get('[data-testid="priority-select"]').select('Medium');
    cy.get('[data-testid="status-select"]').select('in-progress');
    cy.get('[data-testid="dueDate-input"]').type('2025-06-15');

    // Submit form
    cy.get('[data-testid="submit-button"]').click();

    // Verify onAddGoal was called with correct arguments
    cy.wrap(onAddGoalStub).should('be.calledOnce');
    cy.wrap(onAddGoalStub).should((stub) => {
      const call = stub.getCall(0);
      const todo: Todo = call.args[0];
      
      expect(todo.title).to.equal('Complete Todo');
      expect(todo.description).to.equal('This is a complete todo item');
      expect(todo.priority).to.equal('Medium');
      expect(todo.status).to.equal('in-progress');
      expect(todo.dueDate).to.equal('2025-06-15');
      expect(todo.id).to.be.a('number');
    });
  });

  it('should reset form after successful submission', () => {
    cy.mount(<InputToDo onAddGoal={onAddGoalStub} />);

    // Fill in the form
    cy.get('[data-testid="title-input"]').type('Todo to Reset');
    cy.get('[data-testid="description-input"]').type('Form should reset after submit');
    cy.get('[data-testid="priority-select"]').select('Low');
    cy.get('[data-testid="status-select"]').select('done');
    cy.get('[data-testid="dueDate-input"]').type('2025-08-20');

    // Submit form
    cy.get('[data-testid="submit-button"]').click();

    // Verify form fields are reset
    cy.get('[data-testid="title-input"]').should('have.value', '');
    cy.get('[data-testid="description-input"]').should('have.value', '');
    cy.get('[data-testid="dueDate-input"]').should('have.value', '');
  });

  it('should hide error message after 3 seconds', () => {
    cy.mount(<InputToDo onAddGoal={onAddGoalStub} />);

    // Submit empty form to trigger error
    cy.get('[data-testid="submit-button"]').click();

    // Error should be visible initially
    cy.contains('All fields are required to add a new goal.').should('be.visible');

    // Wait 3 seconds and verify error is gone
    cy.wait(3000);
    cy.contains('All fields are required to add a new goal.').should('not.exist');
  });

  it('should accept all priority options', () => {
    cy.mount(<InputToDo onAddGoal={onAddGoalStub} />);

    // Test High priority
    cy.get('[data-testid="priority-select"]').select('High');
    cy.get('[data-testid="priority-select"]').should('have.value', 'High');

    // Test Medium priority
    cy.get('[data-testid="priority-select"]').select('Medium');
    cy.get('[data-testid="priority-select"]').should('have.value', 'Medium');

    // Test Low priority
    cy.get('[data-testid="priority-select"]').select('Low');
    cy.get('[data-testid="priority-select"]').should('have.value', 'Low');
  });

  it('should accept all status options', () => {
    cy.mount(<InputToDo onAddGoal={onAddGoalStub} />);

    // Test todo status
    cy.get('[data-testid="status-select"]').select('todo');
    cy.get('[data-testid="status-select"]').should('have.value', 'todo');

    // Test in-progress status
    cy.get('[data-testid="status-select"]').select('in-progress');
    cy.get('[data-testid="status-select"]').should('have.value', 'in-progress');

    // Test done status
    cy.get('[data-testid="status-select"]').select('done');
    cy.get('[data-testid="status-select"]').should('have.value', 'done');
  });

  it('should generate unique IDs for different todos', () => {
    cy.mount(<InputToDo onAddGoal={onAddGoalStub} />);

    // Submit first todo
    cy.get('[data-testid="title-input"]').type('First Todo');
    cy.get('[data-testid="description-input"]').type('First Description');
    cy.get('[data-testid="priority-select"]').select('High');
    cy.get('[data-testid="status-select"]').select('todo');
    cy.get('[data-testid="dueDate-input"]').type('2025-01-01');
    cy.get('[data-testid="submit-button"]').click();

    // Wait a moment to ensure different timestamp
    cy.wait(10);

    // Submit second todo
    cy.get('[data-testid="title-input"]').type('Second Todo');
    cy.get('[data-testid="description-input"]').type('Second Description');
    cy.get('[data-testid="priority-select"]').select('Low');
    cy.get('[data-testid="status-select"]').select('done');
    cy.get('[data-testid="dueDate-input"]').type('2025-02-01');
    cy.get('[data-testid="submit-button"]').click();

    // Verify both calls had different IDs
    cy.wrap(onAddGoalStub).should('be.calledTwice');
    cy.wrap(onAddGoalStub).should((stub) => {
      const firstCall = stub.getCall(0);
      const secondCall = stub.getCall(1);
      const firstId = firstCall.args[0].id;
      const secondId = secondCall.args[0].id;
      
      expect(firstId).to.not.equal(secondId);
    });
  });
});

// ///===========================================================
// import React from "react";
// import InputToDo from "../../src/components/InputToDo";

// describe("InputToDo Component", () => {
//   it("renders the form correctly", () => {
//     cy.mount(<InputToDo onAddGoal={cy.stub()} />);

//     cy.contains("Add to your TODO List").should("be.visible");
//     cy.get("input[placeholder='Title']").should("exist");
//     cy.get("button[type='submit']").should("contain.text", "Add Goal");
//   });

//   it("shows error when submitting empty form", () => {
//     cy.mount(<InputToDo onAddGoal={cy.stub()} />);
//     cy.get("button[type='submit']").click();
//     cy.contains("All fields are required").should("be.visible");
//   });

//   it("calls onAddGoal with form data when valid", () => {
//     const onAddGoal = cy.stub().as("onAddGoal");
//     cy.mount(<InputToDo onAddGoal={onAddGoal} />);

//     cy.get("input[placeholder='Title']").type("New Goal");
//     cy.get("input[placeholder='Description']").type("Testing component");
//     cy.get("select[aria-label='Default select']").eq(0).select("High");
//     cy.get("select[aria-label='Default select']").eq(1).select("todo");

//     // Set a valid date
//     const today = new Date().toISOString().split("T")[0];
//     cy.get("input[type='date']").type(today);

//     cy.get("button[type='submit']").click();

//     cy.get("@onAddGoal").should("have.been.calledOnce");
//     cy.get("@onAddGoal").its("firstCall.args.0").should((goal: any) => {
//       expect(goal).to.have.property("title", "New Goal");
//       expect(goal).to.have.property("description", "Testing component");
//       expect(goal).to.have.property("priority", "High");
//       expect(goal).to.have.property("status", "todo");
//       expect(goal).to.have.property("dueDate", today);
//       expect(goal).to.have.property("id");
//     });
//   });
// });
