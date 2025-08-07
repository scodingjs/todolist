export type Todo = {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "High" | "Medium" | "Low";
  dueDate: string | Date;
  id: number;
}

export interface AllToDosProps {
  todos: Todo[];
  onDeleteGoal: (id: number) => void;
}

export type ToDoProps = {
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    dueDate: string | Date;
    status: "todo" | "in-progress" | "done";
    id: number;
    onDelete: (id: number) => void;
}


export type InputToDoProps = {
  onAddGoal:(goal:Todo) => void;
}

//Alternate to use interface,
// type Todo = {
//     goal:{
//   title: string;
//   description: string;
//   status: "todo" | "in-progress" | "done";
//   priority: "High" | "Medium" | "Low";
//   dueDate: string | Date; 
//   id: number;
//     }[]
// }
// const AllGoals = ({goal}:Todo) => {


