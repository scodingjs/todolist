import {lazy,Suspense} from 'react';
import Header from "./components/Header";
// import Goal from "./components/Goal"
import todoList from "./resources/data/todoList.json";
import './App.css'
import { useEffect, useState } from 'react';
import todo from "./assets/todo.png"
import { type Todo } from "./resources/types/propsTypes"
const InputToDo = lazy(() =>import ( "./components/InputToDo"));
const AllGoals = lazy(() =>   import("./components/AllToDos"));


function App() {
  //const [todos, setTodos] = useState<Todo[]>(todoList as Todo[])
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : todoList as Todo[];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  const handleDelete = ((id: number) => {
    setTodos(prevToDos => prevToDos.filter(todo => todo.id !== id))
  })

  const addNewGoal = (newTodo: Todo) => {
    setTodos(prevTodos => {

      return [...prevTodos, newTodo]
    })
    console.log("New todo added", newTodo, todos);
    
  }

  const handleUpdateGoal = (updatedGoal: Todo) => {
    console.log("Updating goal", updatedGoal);
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === updatedGoal.id) {
          return updatedGoal;
        }
        return todo;
      })
    })
  }

  return (
    <>
      <Header
        image={{ src: todo, alt: "App Icon", width: "50", height: "50" }}>
        <h1 data-testid="app-title">ToDo List</h1>
      </Header>
      <section className="container">
        <Suspense fallback={<section>Loading To Do's</section>}>
        <InputToDo onAddGoal={addNewGoal} />
        <AllGoals todos={todos} onDeleteGoal={handleDelete} onUpdateGoal={handleUpdateGoal} />
        </Suspense>
      </section>
    </>
  )
}

export default App
