import React, {useEffect, useState, useContext} from 'react';
import{Modal,Button,Row,Col,Form} from 'react-bootstrap';
import axios from "axios";
import API from '../../constants/Api';
import AuthContext from "../../contexts/AuthContext";
export default function ViewAssignmentModal(props) {
    const ctx = useContext(AuthContext);
    const changeFormatDatetime = (value) => {
        let tempDatetime = new Date(value);
        return tempDatetime.toLocaleDateString('en-GB');
    }
    const handleStateName = (stateId) => {
        switch (stateId) {
            case 1:
                return "Wating for Acceptance";
            case 2:
                return "Accepted";
            case 3:
                return "Declined";
            default:
                return;
        }
    }
    const [assetName,setAssetName] = useState([]);
    useEffect(() => {
        axios({
            method: "GET",
            url: `${API.ASSIGNMENT_ASSET_INFO}`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": ctx.token
            }
        })
            .then(res => {
                setAssetName(res.data);
            });
    }, []);

    // const [userName,setUserName] = useState([]);
    // useEffect(() => {
    //     axios({
    //         method: "GET",
    //         url:  `${API.ASSIGNMENT_USER_INFO}`,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "Authorization": ctx.token
    //         }
    //     })
    //         .then(res => {
    //             setUserName(res.data);
    //         });
    // }, []);
 

    
    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <p className="text-danger">Detailed Assignment Information </p>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table>
                <tbody>
                <tr>
                    <td id=""><Form.Label>Asset Code </Form.Label></td>
                    <td id=""><Form.Label>&nbsp;{props.assignment.assetCode}</Form.Label></td>
                </tr>
                <tr>
                    <td id=""><Form.Label>Asset Name</Form.Label></td>
                    <td id=""><Form.Label>
                        &nbsp;{ 
                       props.assignment.assetName
                            }</Form.Label></td>
                </tr>
                <tr>
                <td id=""><Form.Label>Specification </Form.Label></td>
                <td id=""><Form.Label>
                        &nbsp;{ 
                            assetName.map((asset) => {
                                if (asset.assetCode === props.assignment.assetCode) {
                                    return asset.specification
                                }
                                else {
                                    return null;
                                }
                            })
                            }</Form.Label></td>
                </tr>
                <tr>
                <td><Form.Label id="">Assigned to </Form.Label></td>
                <td><Form.Label id="">&nbsp;{ 
                             props.assignment.assignedToName
                            }</Form.Label></td>
                </tr>
                <tr>
                <td><Form.Label id="">Assigned by</Form.Label></td>
                <td><Form.Label id="">&nbsp;{ 
                            props.assignment.assignedByName
                            }</Form.Label></td>
                </tr>
                <tr>
                <td><Form.Label id="">Assigned Date</Form.Label></td>
                <td><Form.Label id="">&nbsp;{changeFormatDatetime(props.assignment.assignmentDate)}</Form.Label></td>
                </tr>
                <tr>
                <td><Form.Label id="">State</Form.Label></td>
                <td><Form.Label id="">&nbsp;{handleStateName(props.assignment.stateId)}</Form.Label></td>
                </tr>
                <tr>
                <td><Form.Label id="">Note</Form.Label></td>
                <td><Form.Label id="">&nbsp;{props.assignment.note}</Form.Label></td>
                </tr>
                </tbody>
            </table>
           </Modal.Body> 
        </Modal>
    );
}