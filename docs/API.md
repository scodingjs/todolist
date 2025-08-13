## API Reference

This project is a small React + TypeScript ToDo application built with Vite and React-Bootstrap. Below are the public components and types exposed by the app, along with usage guidance and examples.

- React: 18+
- TypeScript: 5+
- UI: React-Bootstrap (ensure the CSS is imported, as shown below)

```tsx
// src/main.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

---

## Components

### App
- Description: Root application component; manages `todos` state and composes `Header`, `InputToDo`, and `AllToDos`.
- Props: none
- Usage:
```tsx
import App from './App';

// Rendered in src/main.tsx
```

---

### Header
- File: `src/components/Header.tsx`
- Default export: `Header`
- Purpose: Renders a top navigation bar with a brand area and an image.
- Props:
  - `image`: `{ src: string; alt: string; width?: string; height?: string }`
  - `children`: `ReactNode` (brand content, e.g., a title)
- Example:
```tsx
import Header from './components/Header';
import todo from './assets/todo.png';

<Header image={{ src: todo, alt: 'App Icon', width: '50', height: '50' }}>
  <h1>ToDo List</h1>
</Header>
```

---

### Footer
- File: `src/components/Footer.tsx`
- Default export: `Footer`
- Purpose: Static footer.
- Props: none
- Example:
```tsx
import Footer from './components/Footer';

<Footer />
```

---

### InputToDo
- File: `src/components/InputToDo.tsx`
- Default export: `InputToDo`
- Purpose: Form for creating a new `Todo`. Validates that all fields are provided. Emits the new `Todo` via `onAddGoal` with a generated numeric `id`.
- Props:
  - `onAddGoal(goal: Todo): void`
- Behavior notes:
  - Required fields: `title`, `description`, `priority`, `status`, `dueDate`.
  - If any are missing, an error message is displayed.
  - `id` is assigned using `Date.now()`.
  - `dueDate` is a `string` (from `<input type="date" />`) or `Date` if supplied programmatically.
- Example:
```tsx
import { useState } from 'react';
import InputToDo from './components/InputToDo';
import type { Todo } from './resources/types/propsTypes';

const Example = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddGoal = (goal: Todo) => {
    setTodos(previous => [...previous, goal]);
  };

  return <InputToDo onAddGoal={handleAddGoal} />;
};
```

---

### AllToDos (AllGoals)
- File: `src/components/AllToDos.tsx`
- Default export: `AllGoals` (imported typically as `AllToDos`/`AllGoals`)
- Purpose: Renders a responsive grid of `ToDo` cards using React-Bootstrap.
- Props:
  - `todos: Todo[]`
  - `onDeleteGoal(id: number): void`
- Example:
```tsx
import { useState } from 'react';
import AllGoals from './components/AllToDos';
import type { Todo } from './resources/types/propsTypes';

const Example = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleDeleteGoal = (id: number) => {
    setTodos(previous => previous.filter(todo => todo.id !== id));
  };

  return (
    <AllGoals todos={todos} onDeleteGoal={handleDeleteGoal} />
  );
};
```

---

### ToDo (Goal)
- File: `src/components/ToDo.tsx`
- Default export: `Goal` (imported as the file default, e.g., `import ToDo from './ToDo'`)
- Purpose: Renders a single Todo item as a Bootstrap card with a Delete button.
- Props (see `ToDoProps`):
  - `id: number`
  - `title: string`
  - `description: string`
  - `priority: 'High' | 'Medium' | 'Low'`
  - `status: 'todo' | 'in-progress' | 'done'`
  - `dueDate: string | Date`
  - `onDelete(id: number): void`
- Example:
```tsx
import ToDo from './components/ToDo';

<ToDo
  id={1}
  title="Plan sprint"
  description="Outline tasks for the next iteration"
  priority="High"
  status="in-progress"
  dueDate="2025-08-15"
  onDelete={(id) => console.log('Delete', id)}
/>
```

---

## Types

All types are exported from `src/resources/types/propsTypes.tsx`.

### Todo
```ts
export type Todo = {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string | Date;
  id: number;
};
```

### AllToDosProps
```ts
export interface AllToDosProps {
  todos: Todo[];
  onDeleteGoal: (id: number) => void;
}
```

### ToDoProps
```ts
export type ToDoProps = {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string | Date;
  status: 'todo' | 'in-progress' | 'done';
  id: number;
  onDelete: (id: number) => void;
};
```

### InputToDoProps
```ts
export type InputToDoProps = {
  onAddGoal: (goal: Todo) => void;
};
```

---

## Putting it together

A typical composition looks like this (see `src/App.tsx`):
```tsx
import Header from './components/Header';
import InputToDo from './components/InputToDo';
import AllGoals from './components/AllToDos';
import todoIcon from './assets/todo.png';
import { useState } from 'react';
import type { Todo } from './resources/types/propsTypes';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addNewGoal = (newTodo: Todo) => {
    setTodos(previous => [...previous, newTodo]);
  };

  const handleDelete = (id: number) => {
    setTodos(previous => previous.filter(todo => todo.id !== id));
  };

  return (
    <>
      <Header image={{ src: todoIcon, alt: 'App Icon', width: '50', height: '50' }}>
        <h1>ToDo List</h1>
      </Header>
      <section className="container">
        <InputToDo onAddGoal={addNewGoal} />
        <AllGoals todos={todos} onDeleteGoal={handleDelete} />
      </section>
    </>
  );
};
```

---

## Notes
- The UI relies on React-Bootstrap; ensure its CSS is imported once in your app (already done in `src/main.tsx`).
- `dueDate` can be a `string` from the date input (`YYYY-MM-DD`) or a `Date`. The `ToDo` component displays a formatted date when it is a `Date` instance.
- The `Footer` is currently static and optional.