import React, { useState } from "react";
import { Modal, Form, Row, Col, InputGroup, Button, Table } from "react-bootstrap";

const UserListModal = (props) => {
    const [userResponse, setUserResponse] = useState({
        staffcode: '',
        fullname: ''
    });

    //Filter State
    const [searchText, setSearchText] = useState('');
    const [userListFilter, setUserListFilter] = useState([]);
    const [sortBy, setSortBy] = useState('sortStaffCode');
    const [sortASC, setSortASC] = useState(true);
    const [sortType, setSortType] = useState('NONE');

    const handleShow = () => {
        setUserListFilter(props.userlist);
        setUserResponse({
            staffcode: props.assignment.user_code,
            fullname: props.assignment.user_fullname
        })
    }

    const handleChooseUser = (user) => {
        setUserResponse({
            staffcode: user.staffcode,
            fullname: user.fullName
        })
    }

    //Search by code or name
    const handleSrearchChange = (evt) => {
        setSearchText(evt.target.value);
        setUserListFilter(props.userlist.filter(user =>
            user.fullName.toLowerCase().includes(evt.target.value.toLowerCase()) ||
            user.staffcode.toLowerCase().includes(evt.target.value.toLowerCase())
        ))
    }

    const getUserListByType = () => {
        if (sortType === 'ADMIN') {
            return userListFilter.filter(user => user.isAdmin === true)
        }
        if (sortType === 'STAFF') {
            return userListFilter.filter(user => user.isAdmin === false)
        }
        if (sortType === 'NONE') {
            return userListFilter
        }
    }
    const userListByType = getUserListByType();

    //Type
    const handleSortByType = () => {
        if (sortType === 'NONE') {
            setSortType('ADMIN');
        }
        if (sortType === 'ADMIN') {
            setSortType('STAFF');
        }
        if (sortType === 'STAFF') {
            setSortType('NONE');
        }
    }

    //Sort
    const handleClickSortBy = (evt) => {
        if (evt.target.id === sortBy) {
            setSortASC(!sortASC);
        } else {
            setSortBy(evt.target.id);
            setSortASC(true);
        }
    }

    const getUserListSorted = () => {
        if (sortBy === 'sortStaffCode') {
            if (sortASC) {
                return userListByType.sort((user1, user2) => {
                    if (user1.staffcode.toLowerCase() < user2.staffcode.toLowerCase()) return -1;
                    if (user1.staffcode.toLowerCase() > user2.staffcode.toLowerCase()) return 1;
                })
            } else {
                return userListByType.sort((user1, user2) => {
                    if (user1.staffcode.toLowerCase() > user2.staffcode.toLowerCase()) return -1;
                    if (user1.staffcode.toLowerCase() < user2.staffcode.toLowerCase()) return 1;
                })
            }
        }
        if (sortBy === 'sortName') {
            if (sortASC) {
                return userListByType.sort((user1, user2) => {
                    if (user1.fullName.toLowerCase() < user2.fullName.toLowerCase()) return -1;
                    if (user1.fullName.toLowerCase() > user2.fullName.toLowerCase()) return 1;
                })
            } else {
                return userListByType.sort((user1, user2) => {
                    if (user1.fullName.toLowerCase() > user2.fullName.toLowerCase()) return -1;
                    if (user1.fullName.toLowerCase() < user2.fullName.toLowerCase()) return 1;
                })
            }
        }
    }
    const userListSorted = getUserListSorted();

    const handleSave = () => {
        if (userResponse.fullname === '') {
            props.onHide();
        } else {
            props.onHide(userResponse);
        }
    }

    const handleCancel = () => {
        setUserResponse({
            staffcode: '',
            fullname: ''
        })
        props.onHide()
    }

    return (
        <Modal
            {...props}
            size='lg'
            centered
            onShow={() => handleShow()}
        // backdrop="static"
        >
            <Modal.Header as={Row}>
                <Modal.Title as={Col} id="select-user-modal-title">
                    <h5>Select User</h5>
                </Modal.Title>
                <Col md={{ span: 4 }}>
                    <InputGroup >
                        <Form.Control id="seacrh-user" name="user" type="text"
                            value={searchText}
                            onChange={(evt) => handleSrearchChange(evt)}
                        />
                        <Button variant="outline-secondary" id="search-user-button" disabled={true}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </InputGroup>
                </Col>
            </Modal.Header>
            <Modal.Body style={{ height: '600px', overflow: 'auto' }} >
                <Table hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th onClick={handleClickSortBy} id="sortStaffCode" style={{ cursor: 'pointer' }}>Staff Code</th>
                            <th onClick={handleClickSortBy} id="sortName" style={{ cursor: 'pointer' }}>Full Name</th>
                            <th onClick={handleSortByType} id="sortType" style={{ cursor: 'pointer' }}>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userListSorted.map(user => (
                            <tr key={user.staffcode} onClick={() => handleChooseUser(user)}>
                                <td style={{ width: '10%' }}><Form.Check type="radio" checked={userResponse.staffcode === user.staffcode} readOnly name="user" id={user.staffcode} value={user.staffcode} /></td>
                                <td style={{ width: '20%' }}><Form.Label htmlFor={user.staffcode}>{user.staffcode}</Form.Label></td>
                                <td style={{ width: '50%' }}><Form.Label htmlFor={user.staffcode}>{user.fullName}</Form.Label></td>
                                <td style={{ width: '20%' }}><Form.Label htmlFor={user.staffcode}>{user.isAdmin ? "Admin" : "Staff"}</Form.Label></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleSave}>Save</Button>
                <Button variant="outline-secondary" onClick={() => handleCancel()}>Cancel</Button>
            </Modal.Footer>
        </Modal >
    )
}
export default UserListModal;