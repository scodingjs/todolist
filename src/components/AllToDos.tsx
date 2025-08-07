// import todoList from "../resources/data/todoList.json";
import ToDo from "./ToDo";
import {type AllToDosProps} from "../resources/types/propsTypes";
import { Container, Row } from "react-bootstrap";

// const AllGoals = () => {
//     return(<div className="all-goals">
//         {todoList.map((goal,key) => (<Goal
//             {...goal}id={key} />
//         ))}
//         </div>)
// }




const AllGoals = ({todos,onDeleteGoal}:AllToDosProps) => {
   
    return( <Container className="my-4">
         <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {todos.map((goal,key) => (<ToDo
            {...goal}
            key = {key} 
            onDelete = {onDeleteGoal}/>
        ))}
        </Row>
        </Container>)
}

export default AllGoals;