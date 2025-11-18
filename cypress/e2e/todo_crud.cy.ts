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
        cy.get('[data-testid="todo-item"]').eq(1).within(() => {
            cy.getTestById('todo-title').should('have.length.at.least', 1);
            cy.getTestById('todo-description').should('contain.text', 'Complete certification course');
            cy.getTestById('todo-priority').should('contain.text', 'High')
        })
        // Update
        cy.getTestById("todo-edit").eq(1).click();
        cy.getTestById("model-display").should("be.visible");
        cy.getTestById("edit-title").should('have.value', 'Complete Linkedin course').clear().type('Linkedin course completed',{ delay: 10 })
        cy.getTestById("edit-description").should('have.value', 'Complete certification course').clear().type('Certification exam completed',{ delay: 10 })
        cy.getTestById("edit-priority").should('have.value', 'High').select('Medium')
        cy.getTestById("edit-status").should('have.value', "in-progress").select("done")
        cy.getTestById("submit-edit").click()
         cy.get(`[data-testid="model-display"]`).should("not.exist"); 
        cy.wait(500);

        // Read to check for update changes
        // cy.get('[data-testid="todo-item"]').eq(1).within(() => {
        //     cy.getTestById('todo-title').should('contain.text', "Linkedin course completed");
        //     cy.getTestById('todo-description').should('contain.text', 'Certification exam completed');
        //     cy.getTestById("todo-status").should('contain.text', "done");
        //     cy.getTestById("todo-priority").should('contain.text', "Medium");
        // })
        //Delete
        cy.getTestById("todo-delete").eq(1).click()
        cy.get(`[data-testid="todo-item"]`).eq(1).should("not.exist")
    })
})