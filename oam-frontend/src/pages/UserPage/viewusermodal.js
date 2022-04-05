import React, { Component } from 'react';
import{Modal,Button,Row,Col,Form} from 'react-bootstrap';
export default function ViewUserModal(props) {
    const changeFormatDatetime = (value) => {
        let tempDatetime = new Date(value);
        return tempDatetime.toLocaleDateString('en-GB');
    }
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            View User
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <Form.Label>Staff Code</Form.Label>
                    <Form.Control type="text" placeholder="Staff Code" value={props.user.staffcode} readOnly/>
                </Col>
                <Col>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={props.user.firstName + " " + props.user.lastName} readOnly/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={props.user.username} readOnly/>
                </Col>
                <Col>
                    <Form.Label>DOB</Form.Label>
                    <Form.Control type="text" placeholder="DOB" value={changeFormatDatetime(props.user.dob)} readOnly/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control type="text" placeholder="Gender" value={props.user.gender ? 'Male' : 'Female'} readOnly/>
                </Col>
                <Col>
                    <Form.Label>Type</Form.Label>
                    <Form.Control type="text" placeholder="Role" value={props.user.isAdmin ? 'Admin' : 'Staff'} readOnly/>
                </Col>
                <Col>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Location" value={props.user.location} readOnly/>
                </Col>
                
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
    );
}