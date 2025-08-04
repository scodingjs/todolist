import Header from "./components/Header"
// import Goal from "./components/Goal"
import InputGoal from "./components/InputGoal";
// import todoList from "./resources/data/todoList.json";
import './App.css'
import { useState } from 'react';
import todo from "./assets/todo.png"
import AllGoals from "./components/AllGoals";

type Todo = {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "High" | "Medium" | "Low";
  dueDate: string | Date;
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
        dueDate: (new Date()).toLocaleString(),
        priority: "Medium",
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
      <AllGoals todos = {todos} />
      </section>
    </>
  )
}

export default App
 