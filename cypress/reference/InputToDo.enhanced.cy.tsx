import React from 'react';
import InputToDo from '../../src/components/InputToDo';
import { Todo } from '../../src/resources/types/propsTypes';
import { mount } from 'cypress/react';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * ENHANCED InputToDo Component Tests
 * Covers all missing test cases identified in the analysis
 */
describe('InputToDo Component - Enhanced Test Suite', () => {
  let onAddGoalStub: ReturnType<typeof cy.stub>;

  beforeEach(() => {
    onAddGoalStub = cy.stub();
    cy.mount(<InputToDo onAddGoal={onAddGoalStub} />);
  });

  // ============ EXISTING TESTS (From Original) ============
  
  it('Renders the Form element with input fields', () => {
    cy.get('[data-testid="section-title"]').should('have.text', 'Add to your TODO List').should('be.visible');
    cy.get('[data-testid="section-description"]').should('contain', 'Here you can set your goals/todo').should('be.visible');
    cy.get('[data-testid="title-input"]').should('be.visible');
    cy.get('[data-testid="description-input"]').should('be.visible');
    cy.get('[data-testid="due-date-input"]').should('be.visible');
    cy.get('[data-testid="priority-select"]').should('be.visible');
    cy.get('[data-testid="status-select"]').should('be.visible');
    cy.wrap(onAddGoalStub).should('not.be.called');
  });

  it('Form input fields should take input', () => {
    cy.get('[data-testid="title-input"]').type('Test the todo app input');
    cy.get('[data-testid="description-input"]').type('Complete Component and End to End');
    cy.get('[data-testid="due-date-input"]').type('2026-06-11');
    cy.get('[data-testid="priority-select"]').select('High');
    cy.get('[data-testid="status-select"]').select('todo');
    cy.get('[data-testid="add-todo"]').click();

    cy.wrap(onAddGoalStub).should('be.calledOnce');
    cy.wrap(onAddGoalStub).then((stub) => {
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

  it('When fields are empty and clicked on submit', () => {
    cy.get('[data-testid="add-todo"]').click();
    cy.contains('All fields are required to add a new goal.').should('be.visible');
    cy.wrap(onAddGoalStub).should('not.be.called');
  });

  it('Check all selections of priority option', () => {
    cy.get('[data-testid="priority-select"]').select('High');
    cy.get('[data-testid="priority-select"]').should('have.value', 'High');
    cy.get('[data-testid="priority-select"]').select('Medium');
    cy.get('[data-testid="priority-select"]').should('have.value', 'Medium');
    cy.get('[data-testid="priority-select"]').select('Low');
    cy.get('[data-testid="priority-select"]').should('have.value', 'Low');
  });

  it('Check all options of status', () => {
    cy.get('[data-testid="status-select"]').select('todo');
    cy.get('[data-testid="status-select"]').should('have.value', 'todo');
    cy.get('[data-testid="status-select"]').select('in-progress');
    cy.get('[data-testid="status-select"]').should('have.value', 'in-progress');
    cy.get('[data-testid="status-select"]').select('done');
    cy.get('[data-testid="status-select"]').should('have.value', 'done');
  });

  // ============ NEW TESTS (Missing from Original) ============

  describe('Form Reset After Submission', () => {
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

    it('should allow adding another todo after reset', () => {
      // Add first todo
      cy.get('[data-testid="title-input"]').type('First Todo');
      cy.get('[data-testid="description-input"]').type('First Description');
      cy.get('[data-testid="priority-select"]').select('High');
      cy.get('[data-testid="status-select"]').select('todo');
      cy.get('[data-testid="due-date-input"]').type('2025-01-01');
      cy.get('[data-testid="add-todo"]').click();

      // Add second todo after reset
      cy.get('[data-testid="title-input"]').type('Second Todo');
      cy.get('[data-testid="description-input"]').type('Second Description');
      cy.get('[data-testid="priority-select"]').select('Low');
      cy.get('[data-testid="status-select"]').select('done');
      cy.get('[data-testid="due-date-input"]').type('2025-02-01');
      cy.get('[data-testid="add-todo"]').click();

      cy.wrap(onAddGoalStub).should('be.calledTwice');
    });
  });

  describe('Error Message Auto-Dismiss', () => {
    it('should hide error message after 3 seconds', () => {
      // Trigger error by submitting empty form
      cy.get('[data-testid="add-todo"]').click();

      // Error should be visible initially
      cy.contains('All fields are required to add a new goal.').should('be.visible');

      // Wait 3 seconds and verify error is gone
      cy.wait(3000);
      cy.contains('All fields are required to add a new goal.').should('not.exist');
    });

    it('should show error again if form is resubmitted empty', () => {
      // First submission
      cy.get('[data-testid="add-todo"]').click();
      cy.contains('All fields are required').should('be.visible');
      
      // Wait for error to disappear
      cy.wait(3100);
      cy.contains('All fields are required').should('not.exist');

      // Second submission should show error again
      cy.get('[data-testid="add-todo"]').click();
      cy.contains('All fields are required').should('be.visible');
    });
  });

  describe('Partial Form Validation', () => {
    it('should show error when only title is filled', () => {
      cy.get('[data-testid="title-input"]').type('Only Title');
      cy.get('[data-testid="add-todo"]').click();
      cy.contains('All fields are required').should('be.visible');
      cy.wrap(onAddGoalStub).should('not.be.called');
    });

    it('should show error when only title and description are filled', () => {
      cy.get('[data-testid="title-input"]').type('Title');
      cy.get('[data-testid="description-input"]').type('Description');
      cy.get('[data-testid="add-todo"]').click();
      cy.contains('All fields are required').should('be.visible');
      cy.wrap(onAddGoalStub).should('not.be.called');
    });

    it('should show error when all fields except date are filled', () => {
      cy.get('[data-testid="title-input"]').type('Title');
      cy.get('[data-testid="description-input"]').type('Description');
      cy.get('[data-testid="priority-select"]').select('High');
      cy.get('[data-testid="status-select"]').select('todo');
      cy.get('[data-testid="add-todo"]').click();
      cy.contains('All fields are required').should('be.visible');
      cy.wrap(onAddGoalStub).should('not.be.called');
    });
  });

  describe('Unique ID Generation', () => {
    it('should generate unique IDs for different todos', () => {
      // Submit first todo
      cy.get('[data-testid="title-input"]').type('First Todo');
      cy.get('[data-testid="description-input"]').type('First');
      cy.get('[data-testid="priority-select"]').select('High');
      cy.get('[data-testid="status-select"]').select('todo');
      cy.get('[data-testid="due-date-input"]').type('2025-01-01');
      cy.get('[data-testid="add-todo"]').click();

      // Small delay to ensure different timestamp
      cy.wait(10);

      // Submit second todo
      cy.get('[data-testid="title-input"]').type('Second Todo');
      cy.get('[data-testid="description-input"]').type('Second');
      cy.get('[data-testid="priority-select"]').select('Low');
      cy.get('[data-testid="status-select"]').select('done');
      cy.get('[data-testid="due-date-input"]').type('2025-02-01');
      cy.get('[data-testid="add-todo"]').click();

      // Verify different IDs
      cy.wrap(onAddGoalStub).should('be.calledTwice');
      cy.wrap(onAddGoalStub).then((stub) => {
        const firstId = stub.getCall(0).args[0].id;
        const secondId = stub.getCall(1).args[0].id;
        expect(firstId).to.not.equal(secondId);
        expect(firstId).to.be.a('number');
        expect(secondId).to.be.a('number');
      });
    });
  });

  describe('Multiple Form Submissions', () => {
    it('should handle multiple sequential submissions', () => {
      const todosToAdd = [
        { title: 'First', desc: 'First todo', priority: 'High', status: 'todo', date: '2025-01-01' },
        { title: 'Second', desc: 'Second todo', priority: 'Medium', status: 'in-progress', date: '2025-02-01' },
        { title: 'Third', desc: 'Third todo', priority: 'Low', status: 'done', date: '2025-03-01' },
      ];

      todosToAdd.forEach((todo, index) => {
        cy.get('[data-testid="title-input"]').type(todo.title);
        cy.get('[data-testid="description-input"]').type(todo.desc);
        cy.get('[data-testid="priority-select"]').select(todo.priority);
        cy.get('[data-testid="status-select"]').select(todo.status);
        cy.get('[data-testid="due-date-input"]').type(todo.date);
        cy.get('[data-testid="add-todo"]').click();
        
        if (index < todosToAdd.length - 1) {
          cy.wait(10); // Small delay between submissions
        }
      });

      cy.wrap(onAddGoalStub).should('have.callCount', 3);
    });
  });

  describe('Special Characters Handling', () => {
    it('should accept title with special characters', () => {
      cy.get('[data-testid="title-input"]').type('Todo @#$% &*()!');
      cy.get('[data-testid="description-input"]').type('Description');
      cy.get('[data-testid="priority-select"]').select('High');
      cy.get('[data-testid="status-select"]').select('todo');
      cy.get('[data-testid="due-date-input"]').type('2025-01-01');
      cy.get('[data-testid="add-todo"]').click();

      cy.wrap(onAddGoalStub).should('be.calledOnce');
      cy.wrap(onAddGoalStub).then((stub) => {
        expect(stub.getCall(0).args[0].title).to.equal('Todo @#$% &*()!');
      });
    });

    it('should accept description with quotes and apostrophes', () => {
      cy.get('[data-testid="title-input"]').type('Title');
      cy.get('[data-testid="description-input"]').type('It\'s a "special" description');
      cy.get('[data-testid="priority-select"]').select('High');
      cy.get('[data-testid="status-select"]').select('todo');
      cy.get('[data-testid="due-date-input"]').type('2025-01-01');
      cy.get('[data-testid="add-todo"]').click();

      cy.wrap(onAddGoalStub).should('be.calledOnce');
    });

    it('should accept unicode and emoji characters', () => {
      cy.get('[data-testid="title-input"]').type('Todo 📝 ✅ 🎯');
      cy.get('[data-testid="description-input"]').type('Testing émojis and ñ chars');
      cy.get('[data-testid="priority-select"]').select('High');
      cy.get('[data-testid="status-select"]').select('todo');
      cy.get('[data-testid="due-date-input"]').type('2025-01-01');
      cy.get('[data-testid="add-todo"]').click();

      cy.wrap(onAddGoalStub).should('be.calledOnce');
    });
  });

  describe('Input Length Edge Cases', () => {
    it('should accept long title (100+ characters)', () => {
      const longTitle = 'A'.repeat(150);
      cy.get('[data-testid="title-input"]').type(longTitle);
      cy.get('[data-testid="description-input"]').type('Description');
      cy.get('[data-testid="priority-select"]').select('High');
      cy.get('[data-testid="status-select"]').select('todo');
      cy.get('[data-testid="due-date-input"]').type('2025-01-01');
      cy.get('[data-testid="add-todo"]').click();

      cy.wrap(onAddGoalStub).should('be.calledOnce');
    });

    it('should accept long description (500+ characters)', () => {
      const longDesc = 'B'.repeat(550);
      cy.get('[data-testid="title-input"]').type('Title');
      cy.get('[data-testid="description-input"]').type(longDesc);
      cy.get('[data-testid="priority-select"]').select('High');
      cy.get('[data-testid="status-select"]').select('todo');
      cy.get('[data-testid="due-date-input"]').type('2025-01-01');
      cy.get('[data-testid="add-todo"]').click();

      cy.wrap(onAddGoalStub).should('be.calledOnce');
    });

    it('should accept single character inputs', () => {
      cy.get('[data-testid="title-input"]').type('A');
      cy.get('[data-testid="description-input"]').type('B');
      cy.get('[data-testid="priority-select"]').select('High');
      cy.get('[data-testid="status-select"]').select('todo');
      cy.get('[data-testid="due-date-input"]').type('2025-01-01');
      cy.get('[data-testid="add-todo"]').click();

      cy.wrap(onAddGoalStub).should('be.calledOnce');
    });
  });

  describe('Date Validation', () => {
    it('should accept future dates', () => {
      cy.get('[data-testid="title-input"]').type('Future Todo');
      cy.get('[data-testid="description-input"]').type('Description');
      cy.get('[data-testid="priority-select"]').select('High');
      cy.get('[data-testid="status-select"]').select('todo');
      cy.get('[data-testid="due-date-input"]').type('2030-12-31');
      cy.get('[data-testid="add-todo"]').click();

      cy.wrap(onAddGoalStub).should('be.calledOnce');
      cy.wrap(onAddGoalStub).then((stub) => {
        expect(stub.getCall(0).args[0].dueDate).to.equal('2030-12-31');
      });
    });

    it('should accept past dates', () => {
      cy.get('[data-testid="title-input"]').type('Past Todo');
      cy.get('[data-testid="description-input"]').type('Description');
      cy.get('[data-testid="priority-select"]').select('High');
      cy.get('[data-testid="status-select"]').select('done');
      cy.get('[data-testid="due-date-input"]').type('2020-01-01');
      cy.get('[data-testid="add-todo"]').click();

      cy.wrap(onAddGoalStub).should('be.calledOnce');
      cy.wrap(onAddGoalStub).then((stub) => {
        expect(stub.getCall(0).args[0].dueDate).to.equal('2020-01-01');
      });
    });

    it('should accept today\'s date', () => {
      const today = new Date().toISOString().split('T')[0];
      cy.get('[data-testid="title-input"]').type('Today Todo');
      cy.get('[data-testid="description-input"]').type('Description');
      cy.get('[data-testid="priority-select"]').select('High');
      cy.get('[data-testid="status-select"]').select('todo');
      cy.get('[data-testid="due-date-input"]').type(today);
      cy.get('[data-testid="add-todo"]').click();

      cy.wrap(onAddGoalStub).should('be.calledOnce');
    });
  });

  describe('Form Accessibility', () => {
    it('should have proper labels for all form fields', () => {
      cy.contains('label', 'Title').should('exist');
      cy.contains('label', 'Description').should('exist');
      cy.contains('label', 'Priority').should('exist');
      cy.contains('label', 'Status').should('exist');
      cy.contains('label', 'Due Date').should('exist');
    });

    it('submit button should be focusable', () => {
      cy.get('[data-testid="add-todo"]').focus().should('have.focus');
    });
  });
});
