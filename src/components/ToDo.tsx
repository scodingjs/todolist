import { type ToDoProps, type Todo } from "../resources/types/propsTypes";
import Card from 'react-bootstrap/Card';

const Goal = ({ title, description, priority, dueDate, status, id,  onDelete, onUpdateGoal }: ToDoProps) => {
    return (<>
       <Card
        //   bg='info'
        //   text= 'white'
          className="mb-2 goal-card"
          border="warning"
          data-id={id}>
           <Card.Header>
                {title}
            </Card.Header>
             <Card.Body>
                <p>{description}</p>

            <p>{(dueDate instanceof Date) ? dueDate.toLocaleDateString() : dueDate}</p>
            <p>{priority}</p>
            <p>{status}</p>
             </Card.Body>
            <Card.Footer>
            <button className="btn btn-warning m-2"
             onClick={() => onUpdateGoal({title,description,status,priority,dueDate,id} as Todo)}>Edit</button>
            <button className="btn btn-danger m-2" 
            onClick={() => onDelete(id)}>Delete</button>
            </Card.Footer>
        </Card>
    </>)
}

export default Goal;  