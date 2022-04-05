import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export default function ModalView(props) {
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
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Assignment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Label>Asset Code</Form.Label>
                        <Form.Control type="text" placeholder="Asset Code" value={props.assignment.assetCode} readOnly />
                    </Col>
                    <Col>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" value={props.assignment.assetName} readOnly />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Assignment To Id</Form.Label>
                        <Form.Control type="text" placeholder="Location" value={props.assignment.assignedToId} readOnly />
                    </Col>
                    <Col>
                        <Form.Label>Assignment To Name</Form.Label>
                        <Form.Control type="text" placeholder="Specification" value={props.assignment.assignedToName} readOnly />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Assignment By Id</Form.Label>
                        <Form.Control type="text" placeholder="Location" value={props.assignment.assignedById} readOnly />
                    </Col>
                    <Col>
                        <Form.Label>Assignment By Name</Form.Label>
                        <Form.Control type="text" placeholder="Specification" value={props.assignment.assignedByName} readOnly />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Assignment Date</Form.Label>
                        <Form.Control type="text" placeholder="Category" value={changeFormatDatetime(props.assignment.assignmentDate)} readOnly />
                    </Col>
                    <Col>
                        <Form.Label>Assignment State</Form.Label>
                        {props.assignment.stateId === 1 && (<Form.Control type="text" placeholder="State" value={"Waiting for acceptance"} readOnly />)}
                        {props.assignment.stateId === 2 && (<Form.Control type="text" placeholder="State" value={"Accepted"} readOnly />)}
                        {props.assignment.stateId === 3 && (<Form.Control type="text" placeholder="State" value={"Declined"} readOnly />)}
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}