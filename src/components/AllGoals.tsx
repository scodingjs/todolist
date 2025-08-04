// import todoList from "../resources/data/todoList.json";
import Goal from "./Goal";

// const AllGoals = () => {
//     return(<div className="all-goals">
//         {todoList.map((goal,key) => (<Goal
//             {...goal}id={key} />
//         ))}
//         </div>)
// }

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

type Todo = {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "High" | "Medium" | "Low";
  dueDate: string | Date;
  id: number;
}

interface AllGoalsProps {
  todos: Todo[];
}

const AllGoals = ({todos}:AllGoalsProps) => {
    return(<div className="all-goals">
        {todos.map((goal,key) => (<Goal
            {...goal}id={key} />
        ))}
        </div>)
}

export default AllGoals;