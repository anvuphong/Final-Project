import React, {Component, useContext} from 'react';
import { Modal, Button, Row, Col, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import API from "../../../constants/Api";
import AuthContext from "../../../contexts/AuthContext.js";

export default function ModalDelete(props) {
    const ctx = useContext(AuthContext);
    function deleteAssignment() {
        axios({
            method: 'DELETE',
            url: `${API.ASSIGNMENT_DELETE}?code=${props.assignment.assignmentId}`,
            headers: {
                "Authorization": ctx.token
            }
        })
        window.location.reload();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            className='modal-delete'
            style={{
                width:'400px',
                marginLeft: '35%'
            }}
            
        >
            <Modal.Header closeButton className='title-div' style={{backgroundColor: 'gainsboro'}}>
                <Modal.Title id="contained-modal-title-vcenter" className='delete-title' style={{fontWeight: 'bold', color: 'crimson', marginLeft: '30px'}}>
                    Are you sure?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Label className='delete-ask-text' style={{marginLeft: '30px'}}>Do you want to delete this assignment?</Form.Label>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { deleteAssignment(); props.onHide(); }} className="btn btn-danger" style={{marginRight: '10%'}}>Delete</Button>
                <Button onClick={props.onHide} className='close-delete' style={{backgroundColor: 'white', color: 'black',marginRight: '40%'}}>Cancel</Button>
            </Modal.Footer>
        </Modal>

    )
}