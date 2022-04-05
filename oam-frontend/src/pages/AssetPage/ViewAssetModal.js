import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export default function ViewAssetModal(props) {
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
                    Asset
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Label>Asset Code</Form.Label>
                        <Form.Control type="text" placeholder="Asset Code" value={props.asset.assetCode} readOnly />
                    </Col>
                    <Col>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" value={props.asset.assetName} readOnly />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Location" value={props.asset.location} readOnly />
                    </Col>
                    <Col>
                        <Form.Label>Specification</Form.Label>
                        <Form.Control type="text" placeholder="Specification" value={props.asset.specification} readOnly />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" placeholder="Category" value={props.asset.categoryName} readOnly />
                    </Col>
                    <Col>
                        <Form.Label>State</Form.Label>

                        {props.asset.stateId === 1 && (<Form.Control type="text" placeholder="State" value={"Available"} readOnly />)}
                        {props.asset.stateId === 2 && (<Form.Control type="text" placeholder="State" value={"Not Available"} readOnly/>)}
                        {props.asset.stateId === 3 && (<Form.Control type="text" placeholder="State" value={"Waiting for recycle"} readOnly/>)}
                        {props.asset.stateId === 4 && (<Form.Control type="text" placeholder="State" value={"Recycled"} readOnly/>)}
                        {props.asset.stateId === 5 && (<Form.Control type="text" placeholder="State" value={"Assigned"} readOnly/>)}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Location</Form.Label>
                        <Form.Control type="text" placeholder="Location" value={props.asset.location} readOnly />
                    </Col>
                    <Col>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" placeholder="Quantity" value={props.asset.quantity} readOnly />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Created At</Form.Label>
                        <Form.Control type="text" placeholder="Create At" value={changeFormatDatetime(props.asset.createdAt)} readOnly />
                    </Col>
                    <Col>
                        <Form.Label>Updated At</Form.Label>
                        <Form.Control type="text" placeholder="Updated At" value={changeFormatDatetime(props.asset.updatedAt)} readOnly />
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}