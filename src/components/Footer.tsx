const  Footer = () => {
    return(<>
        <footer className="footer" data-testid="footer">
            <p data-testid="footer-text" className="text-center">© {new Date().getFullYear()} My ToDo App</p>
        </footer>
        </>)
}

export default Footer