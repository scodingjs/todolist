import Header from "./components/Header"
import Goal from "./components/Goal"
import InputGoal from "./components/InputGoal";

import './App.css'
import { useState } from 'react';
import todo from "./assets/todo.png"

type Todo = {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: Date;
  id: number;
}


function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const addNewGoal = () => {
    setTodos(prevTodos => {
      const newTodo: Todo = {
        title: "New Goal",
        description: "Description of the new goal",
        status: "todo",
        dueDate: new Date(),
        id: Math.floor(Math.random() * 1000) // Simple ID generation}
      }
      return [...prevTodos, newTodo]
    })
  }

  return (
    <>
      <Header
      image={{ src: todo, alt: "App Icon",width:"50", height: "50" }}>
        <h1>ToDo List</h1>
      </Header>
      <section className="container">
        <InputGoal />
      {/* <Goal>

      </Goal> */}
      </section>
    </>
  )
}

export default App
