import React, { Component } from 'react';
import{Modal,Button,Row,Col,Form} from 'react-bootstrap';

 export default function ErrorModal(props){
    
        return (
         <Modal
         {...props}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
         >
             <Modal.Header closeButton>
                 <Modal.Title id="contained-modal-title-vcenter">
                     Cannot disable this user
                 </Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 There are valid assignment(s) belonging to this user.<br/>
                 Please close all assignment(s) before disabling this user.
           </Modal.Body>
             <Modal.Footer>
                 <Button onClick={props.onHide}>Close</Button>
             </Modal.Footer>
         </Modal>
    );
}


