import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {Link} from "react-router-dom";
import Paths from "../../../constants/Paths";

export default function ErrorDeleteModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered
            style={{
                width:'500px',
                marginLeft: '35%'
            }}
        >
            <Modal.Header closeButton style={{backgroundColor: 'gainsboro'}}>
                <Modal.Title id="contained-modal-title-vcenter" className='delete-title' style={{color: "red",fontWeight:'bold', marginLeft:'20px'}}>
                    Cannot Delete Asset
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{marginLeft:'20px'}}>
                <Row>
                    <Col>
                        <Form.Label className='delete-ask-text'>Cannot delete the asset because it belongs to one or more historical assignments</Form.Label>
                        <Form.Label className='delete-ask-text'>If the asset is not able to be used anymore, please update its state in 
                        <Link to={`${Paths.ASSETS_EDIT_PATH}/${props.asset.assetCode}`}>  Edit Asset page</Link>
                        </Form.Label>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>

    )
}