import Goals from "./components/Goals"
import './App.css'
import Header from "./components/Header"

function App() {
 

  return (
    <>
      <Header image = {{src:"", alt:"App Icon"}}>
        <h1>ToDo List</h1>
        </Header>
     <Goals>

     </Goals>
    </>
  )
}

export default App
