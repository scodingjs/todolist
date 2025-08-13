import { type ToDoProps } from "../resources/types/propsTypes";
import Card from 'react-bootstrap/Card';

const Goal = ({ title, description, priority, dueDate, status, id,  onDelete }: ToDoProps) => {
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

            <button className="btn btn-danger" onClick={() => onDelete(id)}>Delete</button>
            </Card.Footer>
        </Card>
    </>)
}

export default Goal;  