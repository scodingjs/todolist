import Header from "../../src/components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';


describe('Header Component rendering',()=>{
    beforeEach(()=>{
        cy.mount(<Header image={{
            src: "./assets/todo.png",
            alt: "App Icon",
            width:"50",
            height: "50",
        }} children={<h1 data-testid="app-title">ToDo List</h1>} />);
    });
    it("Should display Navbar",()=>{
        cy.getTestById("navbar").should('exist').and('be.visible');
        cy.getTestById("navbar-brand").should('exist')
        .and('have.attr','href',"/")
    });
    it("Should check for Image/Logo",()=>{
        cy.getTestById("app-logo").
        and('have.attr','src','./assets/todo.png')
        .and('have.attr','alt','App Icon')
    })
})

