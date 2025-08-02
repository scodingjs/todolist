import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const InputGoal = () => {
    return (<>
        <section className="container">

            <h1 className="title">Add New Goal</h1>
             <p className="description">Here you can set your goals for the day, week, or month.</p>
            <Form className='container'>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Complete " />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="priority">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="1">High</option>
                        <option value="2">Medium</option>
                        <option value="3">Low</option>
                    </Form.Select>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="duedate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg">
                        Block level button
                    </Button>
                </div>
            </Form>

        </section>

    </>)
}


export default InputGoal;