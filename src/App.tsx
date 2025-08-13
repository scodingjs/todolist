import Header from "./components/Header"
// import Goal from "./components/Goal"
import InputToDo from "./components/InputToDo";
import todoList from "./resources/data/todoList.json";
import './App.css'
import { useEffect, useState } from 'react';
import todo from "./assets/todo.png"
import AllGoals from "./components/AllToDos";
import {type Todo} from "./resources/types/propsTypes"


function App() {
  const [todos, setTodos] = useState<Todo[]>(todoList as Todo[])

  const handleDelete = ((id: number) => {
    setTodos(prevToDos => prevToDos.filter(todo => todo.id !== id))
  })

  const addNewGoal = (newTodo:Todo) => {
    setTodos(prevTodos => {
      
      return [...prevTodos, newTodo]
    })
    console.log("New todo added", newTodo,todos);
  }
 

  return (
    <>
      <Header
        image={{ src: todo, alt: "App Icon", width: "50", height: "50" }}>
        <h1>ToDo List</h1>
      </Header>
      <section className="container">
        <InputToDo onAddGoal={addNewGoal} />
        <AllGoals todos={todos} onDeleteGoal={handleDelete} />
      </section>
    </>
  )
}  

export default App
