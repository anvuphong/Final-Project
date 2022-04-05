import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form, Spinner, Row, Col, Button, InputGroup} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../constants/Api";
import Paths from "../../../constants/Paths";
import AuthContext from "../../../contexts/AuthContext";
import AssetListModal from "../Modal/AssetListModal";
import UserListModal from "../Modal/UserListModal";

const AssignmentAdd = () => {
    const navigate = useNavigate();
    const currentDate = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
    const ctx = useContext(AuthContext);
    const [assignment, setAssignment] = useState({
        user_fullname: '',
        user_code: '',
        assetCode: '',
        assignedDate: currentDate,
        note: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isValidUser, setIsValidUser] = useState(true);
    const [isValidAsset, setIsValidAsset] = useState(true);

    //UserList State
    const [userList, setUserList] = useState([]);

    //AssetList State
    const [assetList, setAssetList] = useState([]);

    //Open Modal State
    const [openSearchUser, setOpenSearchUser] = useState(false);
    const [openSearchAsset, setOpenSearchAsset] = useState(false);

    //Get List User API
    useEffect(() => {
        let isCancel = false;
        axios({
            method: 'GET',
            url: `${API.USER_LIST_RAWDATA}?location=${ctx.location}`,
            headers: {
                "Authorization": ctx.token
            }
        }).then(response => {
            if (!isCancel) {
                setUserList(response.data)
                setIsLoading(false);
            }
        }).catch((error) => {
            if (!isCancel) {
                setIsLoading(false);
                setError('Something wrong');
            }
        });
        return () => {
            isCancel = true;
        }
    }, []);

    //Get List Asset API
    useEffect(() => {
        let isCancel = false;
        axios({
            method: 'GET',
            url: `${API.ASSET_GETALL_AVAILABLE}?location=${ctx.location}`,
            headers: {
                "Authorization": ctx.token
            }
        }).then(response => {
            if (!isCancel) {
                setAssetList(response.data)
                setIsLoading(false);
            }
        }).catch((error) => {
            if (!isCancel) {
                setIsLoading(false);
                setError('Something wrong');
            }
        });
        return () => {
            isCancel = true;
        }
    }, []);

    const handleInputUserChange = (evt) => {
        let user = userList.find(user => user.staffcode === evt.target.value);
        setAssignment({
            ...assignment,
            user_code: '',
            user_fullname: evt.target.value
        })
        setIsValidUser(true);
        if (user) {
            setAssignment({
                ...assignment,
                user_fullname: user.fullName,
                user_code: user.staffcode
            });
        }
    }

    const handleInputAssetChange = (evt) => {
        setAssignment({
            ...assignment,
            assetCode: evt.target.value
        })
        setIsValidAsset(true);
    }

    const handleInputDateChange = (evt) => {
        console.log(evt)
        setAssignment({
            ...assignment,
            assignedDate: evt.target.value
        })
    }

    const handleInputNoteChange = (evt) => {
        setAssignment({
            ...assignment,
            note: evt.target.value
        })
    }

    const isValidForm = assignment.user_fullname === '' ||
        assignment.assetCode === '' ||
        assignment.assignedDate === '' ||
        assignment.note === '';

    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        let user = userList.find(user => user.staffcode === assignment.user_code);
        let asset = assetList.find(asset => asset.assetCode === assignment.assetCode);
        let isCancel = false;
        if (user && asset) {
            axios({
                method: 'POST',
                url: `${API.ASSIGNMENT_CREATE}`,
                data: {
                    assetCode: assignment.assetCode,
                    assignedBy: ctx.staffcode,
                    assignedTo: assignment.user_code,
                    assignmentDate: assignment.assignedDate,
                    note: assignment.note
                },
                headers: {
                    "Authorization": ctx.token
                }
            }).then((response) => {
                navigate(Paths.ASSIGNMENTS);
            }).catch((error) => {
                if (!isCancel) {
                    setIsLoading(false);
                    setError('Something wrong');
                }
            });
            return () => {
                isCancel = true;
            }
        }
        if (!user) {
            setIsValidUser(false);
            setAssignment({
                ...assignment,
                user_fullname: '',
            });
        }
        if (!asset) {
            setIsValidAsset(false);
            setAssignment({
                ...assignment,
                assetCode: '',
            });
        }

    }


    console.log('assignment: ', assignment)
    // console.log('isvalid: ', isValidForm)
    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            {isLoading && (<Spinner animation="border" variant="danger" />)}

            <UserListModal
                show={openSearchUser}
                onHide={(userResponse) => {
                    setOpenSearchUser(false);
                    {
                        userResponse && (setAssignment({
                            ...assignment,
                            user_fullname: userResponse.fullname,
                            user_code: userResponse.staffcode
                        }))
                    }
                }}
                userlist={userList}
                assignment={assignment}
            />

            <AssetListModal
                show={openSearchAsset}
                onHide={(assetResponse) => {
                    setOpenSearchAsset(false);
                    {
                        assetResponse && (setAssignment({
                            ...assignment,
                            assetCode: assetResponse.assetCode
                        }))
                    }
                }}
                assetlist={assetList}
                assetcode={assignment.assetCode}
            />

            <Form onSubmit={handleOnSubmit}>
                <Form.Label as={'h4'} className="mb-3" >Create New Assignment</Form.Label>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={3}>User</Form.Label>
                    <Col sm={9}>
                        <InputGroup hasValidation>
                            <Form.Control
                                id="assignment-add-input-user"
                                value={assignment.user_fullname} onChange={handleInputUserChange}
                                name="user" type="text"
                                isInvalid={!isValidUser}
                            />
                            <Button variant="outline-secondary" id="assignment-add-find-user-button" onClick={() => setOpenSearchUser(!openSearchUser)}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                User doesn't exist, please enter valid asset code.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <Form.Text muted hidden={!isValidUser}>
                            Enter User Code or click on search icon for User Name.
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={3}>Asset</Form.Label>
                    <Col sm={9}>
                        <InputGroup hasValidation>
                            <Form.Control
                                id="assignment-add-input-asset"
                                value={assignment.assetCode} onChange={handleInputAssetChange}
                                name="asset" type="text"
                                isInvalid={!isValidAsset}
                            />
                            <Button variant="outline-secondary" id="assignment-add-find-asset-button" onClick={() => setOpenSearchAsset(!openSearchAsset)}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                Asset doesn't exist, please enter valid asset code.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <Form.Text muted hidden={!isValidAsset}>
                            Enter Asset Code or click on search icon for Asset Name.
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={3}>Assigned Date</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            id="assignment-add-input-assigned-date"
                            name="date" type="date"
                            value={assignment.assignedDate} onChange={handleInputDateChange}
                            min={currentDate}
                        />
                        <Form.Text muted>
                            Enter Asset.
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={3}>Note</Form.Label>
                    <Col sm={9}>
                        <Form.Control id="assignment-add-input-note"
                            name="note" as="textarea" rows={3}
                            value={assignment.note} onChange={handleInputNoteChange}
                        />
                        <Form.Text muted>
                            Enter Note.
                        </Form.Text>
                    </Col>
                </Form.Group>

                <div className="d-flex justify-content-end">
                    <Button type='submit' variant="danger  mx-5 px-3" disabled={isValidForm}>Save</Button>
                    <Button as={Link} to={Paths.ASSIGNMENTS} variant="outline-secondary">Cancel</Button>
                </div>
            </Form>
        </div>
    )
}
export default AssignmentAdd;