// import todoList from "../resources/data/todoList.json";
import Goal from "./ToDo";
import {type AllToDosProps} from "../resources/types/propsTypes";

// const AllGoals = () => {
//     return(<div className="all-goals">
//         {todoList.map((goal,key) => (<Goal
//             {...goal}id={key} />
//         ))}
//         </div>)
// }




const AllGoals = ({todos,onDeleteGoal}:AllToDosProps) => {
   
    return(<div className="all-goals">
        {todos.map((goal,key) => (<Goal
            {...goal}
            key = {key} 
            onDelete = {onDeleteGoal}/>
        ))}
        </div>)
}

export default AllGoals;