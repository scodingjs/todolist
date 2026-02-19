import AllToDos from "../../src/components/AllToDos.tsx";
import { mount } from 'cypress/react';
import { type Todo } from "../../src/resources/types/propsTypes.tsx"


describe("ALLToDos component functionality test suite", () => {
    let onDeleteGoal: Cypress.Agent<sinon.SinonStub>
    let onUpdateGoal: Cypress.Agent<sinon.SinonStub>
    const mockToDos: Todo[] = [
        {
            id: 1,
            title: "Cypress Testing",
            description: "Complete Cypress testing",
            status: "done",
            priority: "Medium",
            dueDate: "2025-04-11"
        },
        {
            id: 2,
            title: "CI/CD",
            description: "CI/CD - to run Cypress",
            status: "in-progress",
            priority: "High",
            dueDate: "2025-11-11"
        }
    ]
    beforeEach(() => {
        onDeleteGoal = cy.stub().as("onDeleteGoal")
        onUpdateGoal = cy.stub().as("onUpdateGoal")
    })
    describe("Check rendering of all todo's list component", () => {
        it('Render the default todo list', () => {


            mount(<AllToDos
                todos={mockToDos}
                onDeleteGoal={onDeleteGoal}
                onUpdateGoal={onUpdateGoal} />)
            cy.getTestById('todos-container').should('be.visible');
            cy.getTestById('todos-list').should('be.visible');
            cy.get(`[data-id="1"]`).should('exist').and('be.visible')
            cy.get(`[data-id="2"]`).should('exist').and('be.visible')
            cy.getTestById('todo-priority').last().should('have.text', 'High')
            cy.getTestById('todo-status').last().should('have.text', 'in-progress'.toUpperCase())
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
    describe('Empty Todo List state handling', () => {
        it('Should display empty state message when no todos', () => {
            cy.mount(
                <AllToDos
                    todos={[]}
                    onDeleteGoal={onDeleteGoal}
                    onUpdateGoal={onUpdateGoal}
                />
            );
            cy.getTestById('todos-container').should('be.visible');
            cy.getTestById('empty-todos').should('have.text', "No Todo's yet. Add your first goal!")
        })
        it('Empty Todo list should not have any card displayed', () => {
            cy.mount(<AllToDos
                todos={[]}
                onDeleteGoal={onDeleteGoal}
                onUpdateGoal={onUpdateGoal} />);
            cy.get(".goal-card").should("not.exist");
        })
    })
    describe("Delete functionality", () => {
        it("Should call onClick Delete handler with right id", () => {
            cy.mount(<AllToDos
                todos={mockToDos}
                onDeleteGoal={onDeleteGoal}
                onUpdateGoal={onUpdateGoal} 
                />);
            cy.getTestById("todo-card").should("exist");
            cy.get('[data-id="1"]').within(()=>{
                cy.contains('button','Delete').click();
            })
             cy.wrap(onDeleteGoal).should('be.calledWith', 1);
        })

    })
})