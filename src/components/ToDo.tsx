import { useState } from "react";
import { type ToDoProps, type Todo } from "../resources/types/propsTypes";
import Card from 'react-bootstrap/Card';
import { Button, Modal, Form } from 'react-bootstrap';

const Goal = ({ title, description, priority, dueDate, status, id, onDelete, onUpdateGoal }: ToDoProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const[updateGoal,setUpdateGoal]=useState<Todo>({
        title,description,priority,dueDate,status,id
    })
    const handleInputChange = (event: React.ChangeEvent<React.FormControlElement>) => {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;
       // console.log(name, value);
        setUpdateGoal(prevGoal => ({...prevGoal,[name]:value}))
        // console.log(updateGoal)
    }
    return (<>
        <Card
            bg={status === "todo" ? "info" : status === "in-progress" ? "warning" : "success"}
            className="mb-2 goal-card"
         
            data-id={id}>
            <Card.Header>
                <h6>{priority}</h6>
                <p>{status.toLocaleUpperCase()}</p>

            </Card.Header>
            <Card.Body>
                <h4>{title}</h4>
                <p>{description}</p>

                <p>{(dueDate instanceof Date) ? dueDate.toLocaleDateString() : dueDate}</p>
                <p>{priority}</p>
                <p>{status}</p>
            </Card.Body>
            <Card.Footer>
                <button className="btn btn-warning m-2"
                    onClick={() => setIsEditing(prevEditing => !prevEditing)}>Edit</button>
                <button className="btn btn-danger m-2"
                    onClick={() => onDelete(id)}>Delete</button>
            </Card.Footer>
        </Card>

        <Modal show={isEditing} onHide={() => setIsEditing(prevEditing => !prevEditing)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form className='container' onSubmit={() => onUpdateGoal({ title, description, status, priority, dueDate, id } as Todo)}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" value={updateGoal.title} name="title" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" value={updateGoal.description} name="description" onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="priority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Select aria-label="Default select" value={updateGoal.priority}
                            name="priority" onChange={handleInputChange} >
                            <option>Open this select menu</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </Form.Select>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Select aria-label="Default select" value={updateGoal.status}
                            name="status" onChange={handleInputChange} defaultValue="1">
                            <option>Open this select menu</option>
                            <option value="todo">ToDo</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </Form.Select>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dueDate">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control type="date"
                            name="dueDate" onChange={handleInputChange}
                            value={
                                updateGoal.dueDate instanceof Date
                                    ? updateGoal.dueDate.toISOString().split('T')[0]
                                    : updateGoal.dueDate
                            } />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" type="submit"
                            onClick={() => onUpdateGoal({...updateGoal } as Todo)}>
                            Update Task
                        </Button>
                    </div>
                </Form>
            </Modal.Body>

            {/* <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsEditing(prevEditing => !prevEditing)}>
                    Close
                </Button>
                <Button variant="primary" >
                    Save changes
                </Button>
            </Modal.Footer> */}
        </Modal>
    </>
    )
}

export default Goal;  