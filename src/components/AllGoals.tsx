import todoList from "../resources/data/todoList.json";
import Goal from "./Goal";

const AllGoals = () => {
    return(<div className="all-goals">
        {todoList.map((goal,key) => (<Goal
            {...goal}id={key} />
        ))}
        </div>)
}


export default AllGoals;