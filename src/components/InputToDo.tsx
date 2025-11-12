import { useState, type FormEvent, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { type InputToDoProps } from '../resources/types/propsTypes';

const InputToDo = ({ onAddGoal }: InputToDoProps) => {
    const title = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);
    const priority = useRef<HTMLSelectElement>(null);
    const dueDate = useRef<HTMLInputElement>(null);
    const status = useRef<HTMLSelectElement>(null);
    const [error, setError] = useState<string>("");

    const addNewGoal = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("_________ADDING__________________")
        console.log("Adding new goal", title.current?.value, description.current?.value, priority.current?.value, dueDate.current?.value);
        if (title.current?.value && status.current?.value && description.current?.value && priority.current?.value && dueDate.current?.value) {
            const statusValue = status.current.value as "todo" | "in-progress" | "done";
            const priorityValue = priority.current.value as "High" | "Medium" | "Low";
            const newTodo = {
                title: title.current.value,
                description: description.current.value,
                status: statusValue,
                priority: priorityValue,
                dueDate: dueDate.current.value,
                id: Date.now() // Using timestamp as a unique ID
            }
            onAddGoal(newTodo);
            event.currentTarget.reset(); // Reset the form fields after submission
        } else {
            console.error("All fields are required to add a new goal.");

            setError("All fields are required to add a new goal.");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }

    return (<>
        <section data-testId="todo-section"  className="container m-4 p-4 ">

            <h2 className="title" data-testId="section-title">Add to your TODO List</h2>
            <p className="description" data-testId="section-description">Here you can set your goals/todo's  for the day, week, or month.</p>
           {error && <p data-testId="input-error" className='btn-danger'>{error}</p>}
            <Form className='container' data-testId="todo-form" onSubmit={addNewGoal}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" ref={title} data-testId="title-input"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" ref={description} data-testId="description-input"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="priority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select aria-label="select priority" ref={priority} defaultValue="2" data-testId="priority-select">
                        <option>Open this select menu</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Form.Select>

                </Form.Group>
                <Form.Group className="mb-3" controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select aria-label="select status" ref={status} defaultValue="1" data-testId="status-select">
                        <option>Open this select menu</option>
                        <option value="todo">ToDo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </Form.Select>

                </Form.Group>
                <Form.Group className="mb-3" controlId="dueDate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" ref={dueDate} placeholder="Due Date" data-testId="dueDate-input" />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" type="submit" data-testId="add-todo">
                        Add Goal
                    </Button>
                </div>
            </Form>

        </section>

    </>)
}


export default InputToDo