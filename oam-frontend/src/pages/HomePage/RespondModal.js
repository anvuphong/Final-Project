import React, {useContext} from 'react';
import {Form, Modal} from 'react-bootstrap';
import API from '../../constants/Api';
import AuthContext from "../../contexts/AuthContext";

export default function RespondModal(props) {
    const ctx = useContext(AuthContext);
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${API.ASSIGNMENT_ACCEPT}?id=${props.assignment.assignmentId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": ctx.token
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res !== null) {
                    window.location.reload();
                }
            })
            .catch(error => console.error('Error:', error));

    }

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <p>Do you want to accept this assignment?</p>
                    <Form.Group>
                        <button className="btn btn-danger btn-sm" type="submit" onClick={props.onHide}>Accept</button>
                        <button className="btn btn-outline-dark btn-sm" type="button" style={{marginLeft: "5px"}}
                                onClick={props.onHide}>Cancel
                        </button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
}


