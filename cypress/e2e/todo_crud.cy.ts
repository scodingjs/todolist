import React from 'react';
import { type Todo } from "../../src/resources/types/propsTypes.tsx";

describe('TODO app CRUD Operation test suite', () => {
  
    beforeEach(() => {
        cy.visit('/');
        cy.clearAllTodos();
       
    })

    it('Should load homepage', () => {
        cy.location('pathname').should('eq', '/');
        cy.request('/').its('status').should('eq', 200)

    });

    it('Should have CRUD functionality', () => {
        const todoData: Todo = {
            id: 1000,
            title: "Complete Linkedin course",
            description: "Complete certification course",
            priority: "High",
            status: "in-progress",
            dueDate: "2025-12-21"
        }
        // Create 
        cy.addTodo(todoData)
        cy.get('[data-testid="todo-item"]')
            .should("contain.text", todoData.title)
            .and("contain.text", todoData.priority);

        // Read to check for create data
        cy.getTestById('title-input').should('have.length', 1);
        cy.getTestById('description-input').should('contain.text', 'Complete certification course');
        cy.getTestById('priority-select').should('contain.text', 'High')

        // Update
        cy.getTestById("todo-edit").first().click();
        cy.getTestById("model-display").should("be.visible");
        cy.getTestById("edit-title").should('contain.text', 'Complete Linkedin course').clear().type('Linkedin course completed')
        cy.getTestById("edit-description").should('contain.text', 'Complete certification course').clear().type('Certification exam completed')
        cy.getTestById("edit-priority").should('contain.text', 'High')
        cy.getTestById("edit-status").should('contain.text', "in-progress".toLocaleUpperCase()).clear().select("done")
        cy.getTestById("submit-edit").click()
        cy.getTestById("model-display").should("not.be.visible");

        // Read to check for update changes
        cy.getTestById('title-input').should('contain.text', "Linkedin course completed");
        cy.getTestById('description-input').should('contain.text', 'Certification exam completed');
        cy.getTestById("edit-status").should('contain.text', "done".toLocaleUpperCase());
        //Delete
        cy.getTestById("todo-delete").click()
        cy.get(`[data-testid="todo-item"]`).should("not.exist")
    })
})