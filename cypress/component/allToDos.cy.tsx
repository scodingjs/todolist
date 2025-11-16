import AllToDos from "../../src/components/AllToDos.tsx";
import { mount } from 'cypress/react';
import { type Todo} from "../../src/resources/types/propsTypes.tsx"

describe("Check rendering of all todo's list component", () => {
    it('Render the default todo list', () => {
    const mockToDos:Todo[]= [
        {
            id:1,
            title:"Cypress Testing",
            description: "Complete Cypress testing",
            status:"done",
            priority: "Medium",
            dueDate:"2025-04-11"
        },
         {
            id:2,
            title:"CI/CD",
            description: "CI/CD - to run Cypress",
            status:"in-progress",
            priority: "High",
            dueDate:"2025-11-11"
        }
    ]
    const onDeleteGoal = cy.stub().as("onDeleteGoal")
    const onUpdateGoal = cy.stub().as("onUpdateGoal")
    
        mount(<AllToDos
            todos = {mockToDos}
            onDeleteGoal={onDeleteGoal}
            onUpdateGoal={onUpdateGoal} />)
             cy.getTestById('todos-container').should('be.visible');
           cy.getTestById('todos-list').should('be.visible');
        cy.get(`[data-id="1"]`).should('exist').and('be.visible')
         cy.get(`[data-id="2"]`).should('exist').and('be.visible')
        cy.getTestById('todo-priority').last().should('have.text', 'High')
        cy.getTestById('todo-status').last().should('have.text', 'in-progress')
        // Get the card footer
        cy.get('.card-footer').should('exist').and('be.visible')

        // Check it has exactly 2 buttons
        cy.get('.card-footer').first().get('button').should('have.length', 4)

        // Check the text of each button
        cy.get('.card-footer button').first().should('have.text', 'Edit')
        cy.get('.card-footer button').last().should('have.text', 'Delete')

        //Check both buttons are visible and clickable
        cy.contains('button', 'Edit').should('be.visible').click()
        cy.contains('button', 'Delete').should('be.visible').click()
    })
})