import React, { useState, type FormEvent ,useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { type InputToDoProps } from '../resources/types/propsTypes';

const InputToDo = ({onAddGoal} : InputToDoProps) => {
    const title = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);
    const priority = useRef<HTMLSelectElement>(null);
    const dueDate = useRef<HTMLInputElement>(null);
    const status = useRef<HTMLSelectElement>(null);

    const addNewGoal = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        console.log("_________ADDING__________________")
        console.log("Adding new goal",title.current?.value,description.current?.value,priority.current?.value,dueDate.current?.value);
        if(title.current?.value && status.current?.value && description.current?.value && priority.current?.value && dueDate.current?.value) {
            const statusValue = status.current.value as "todo" | "in-progress" | "done";
            const priorityValue = priority.current.value as "High" | "Medium" | "Low";
            const newTodo = {
                title : title.current.value,
                description:description.current.value,
                status: statusValue,
                priority: priorityValue,
                dueDate:dueDate.current.value,
                id: Date.now() // Using timestamp as a unique ID
            }
            onAddGoal(newTodo);
        }
    }

    return (<>
        <section className="container">

            <h1 className="title">Add New Goal</h1>
             <p className="description">Here you can set your goals for the day, week, or month.</p>
            <Form className='container' onSubmit={addNewGoal}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" ref={title} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" ref={description} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="priority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select aria-label="Default select" ref={priority} defaultValue="2">
                        <option>Open this select menu</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Form.Select>
                   
                </Form.Group>
                  <Form.Group className="mb-3" controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select aria-label="Default select" ref={status} defaultValue="1">
                        <option>Open this select menu</option>
                        <option value="todo">ToDo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </Form.Select>
                   
                </Form.Group>
                <Form.Group className="mb-3" controlId="dueDate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" ref={dueDate} placeholder="Due Date"/>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg">
                       Add Goal
                    </Button>
                </div>
            </Form>

        </section>

    </>)
}


export default InputToDo