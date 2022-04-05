import React, {useEffect, useState, useContext} from 'react';
import {Form, FormControl, Pagination, Stack, Table} from 'react-bootstrap';
import ViewUserModal from './viewusermodal';
import DisableUserModal from './disableusermodal';
import ErrorModal from './errormodal';
import axios from "axios";
import API from '../../constants/Api';
import {XCircle} from "react-bootstrap-icons";
import {Link} from "react-router-dom";
import Paths from "../../constants/Paths";
import AuthContext from "../../contexts/AuthContext";


export default function UserPage() {
    const [adminSort, setAdminSort] = useState("2");
    const ctx = useContext(AuthContext);
    const handleAdminSortChange = (event) => {
        setAdminSort(event.target.value);
    }
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({
        data: [],
        errors: null,
        succeeded: null,
        message: null,
        firstPage: null,
        lastPage: null,
        nextPage: null,
        previousPage: null,
        pageNumber: 1,
        pageSize: 10,
        totalPages: 1,
        totalRecords: null,
        searchBy: "",
        searchValue: "",
        sortBy: "",
        sortType: ""
    });

    const [viewShow, setViewShow] = useState(false);
    const [disableShow, setDisableShow] = useState(false);
    const [errorShow, setErrorShow] = useState(false);
    const [user, setUser] = useState({});
    const [disableUser, setDisableUser] = useState({});
    const [sortBy, setSortBy] = useState({
        sortStaffcode: false,
        sortLastName: false,
        sortUserName: false,
        sortJoinedDate: false,
        sortType: false,
    });
    const [sortASC, setSortASC] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const searchParams = new URLSearchParams();
    

    const changeFormatDatetime = (value) => {
        let tempDatetime = new Date(value);
        return tempDatetime.toLocaleDateString('en-GB');
    }

    useEffect(() => {
        if (sortBy.sortStaffcode) {
            searchParams.append("SortBy", "StaffCode");
        }
        if (sortBy.sortLastName) {
            searchParams.append("SortBy", "LastName");
        }
        if (sortBy.sortUserName) {
            searchParams.append("SortBy", "UserName");
        }
        if (sortBy.sortJoinedDate) {
            searchParams.append("SortBy", "JoinedDate");
        }
        if (sortBy.sortType) {
            searchParams.append("SortBy", "Type");
        }


        if (sortASC !== null) {
            searchParams.append("SortType", sortASC ? "asc" : "desc");
        }

        if (searchValue.trim().length > 0) {
            searchParams.append("SearchBy", "LastName");
            searchParams.append("SearchValue", searchValue);
        }
        searchParams.append("PageNumber", pageNumber);
        searchParams.append("PageSize", pageSize);
        searchParams.toString();
        const url = () => {
            let newUrl = `location=${ctx.location}&${searchParams.toString()}`
            if (adminSort !== "") {
                newUrl += `&isAdmin=${adminSort}`
            }
            return newUrl
        }
        axios({
            method: "GET",
            url: `${API.USER_LIST}?${url()} `,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": ctx.token
            }
        })
            .then(res => {
                setUsers(res.data);
                setData({
                    ...data,
                    data: res.data.data,
                    errors: res.data.errors,
                    succeeded: res.data.succeeded,
                    message: res.data.message,
                    firstPage: res.data.firstPage,
                    lastPage: res.data.lastPage,
                    nextPage: res.data.nextPage,
                    previousPage: res.data.previousPage,
                    pageNumber: res.data.pageNumber,
                    pageSize: res.data.pageSize,
                    totalPages: res.data.totalPages,
                    totalRecords: res.data.totalRecords,
                    searchBy: res.data.searchBy,
                    searchValue: res.data.searchValue,
                    sortBy: res.data.sortBy,
                    sortType: res.data.sortType
                });
            });
    }, [sortBy,  sortASC, searchValue, pageNumber, pageSize, adminSort]);

    const handleChangePageSize = (e) => {
        setPageSize(e.target.value);
        setPageNumber(1);   
    }

    const handleChangePageNumber = (number) => {
        setPageNumber(number);
    }


    const handleViewClose = () => setViewShow(false);
    const handleViewShow = (user) => {
        setUser(user);
        setViewShow(true);
    }

    const handleSearch= (e) => {
        e.preventDefault();
    }

    const handleErrorClose = () => setErrorShow(false);
    const handleDisableClose = () => {
        setDisableShow(false);
    }

    const handleDisableShow = (disableUser) => {
        axios({
            method: "GET",
            url: `${API.CHECK_USER}?staffcode=${disableUser.staffcode}`,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": ctx.token
            }
        })
            .then(function (response) {

                if (response.data === true) {
                    setDisableUser(disableUser);
                    setDisableShow(true);
                } else {
                    setErrorShow(true);
                }
            })
            .catch(function (error) {
                    console.log(error);
                }
            );
    }
    const handleClickSortBy = (event) => {
        if (event.target.id === 'sortStaffcode') {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortStaffcode: true,
                    sortLastName: false,
                    sortUserName: false,
                    sortJoinedDate: false,
                    sortType: false,
                };
            });
        } else if (event.target.id === 'sortUserName') {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortStaffcode: false,
                    sortLastName: false,
                    sortUserName: true,
                    sortJoinedDate: false,
                    sortType: false,
                };
            });
        } else if (event.target.id === 'sortJoinedDate') {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortStaffcode: false,
                    sortLastName: false,
                    sortUserName: false,
                    sortJoinedDate: true,
                    sortType: false,
                };
            });
        } else if (event.target.id === 'sortLastName') {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortStaffcode: false,
                    sortLastName: true,
                    sortUserName: false,
                    sortJoinedDate: false,
                    sortType: false,
                };
            });
        } else {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortStaffcode: false,
                    sortLastName: false,
                    sortUserName: false,
                    sortJoinedDate: false,
                    sortType: true,
                };
            });
        }
    };
    const getIconSort = (sort) => {
        switch (sort) {
            case true:
                return <i className="fas fa-sort-down"></i>;
            case false:
                return <i className="fas fa-sort-up"></i>;
            default:
                return;
        }
    }
    const getIconAdminSort = (sort) => {
        switch (sort) {
            case false:
                return <i className="fas fa-sort-down"></i>;
            case true:
                return <i className="fas fa-sort-up"></i>;
            default:
                return;
        }
    }


  

    const handleChangeSearchText = (e) => {
        setSearchValue(e.target.value);
        handleChangePageNumber(data.firstPage)
    }


    return (
        <div className="me-5">
            <div style={{color: 'red'}}>
                <h5>User List</h5>
            </div>
            
            <Form className="d-flex mb-3 w-100">

                <select size="sm"
                        onChange={handleAdminSortChange}
                        style={{ borderRadius: "1px"}}
                        >

                    <option value="2">Type</option>
                    <option value="1">Administrator </option>
                    <option value="0">Staff </option>
                </select>
                <span style={{marginRight: "80px", backgroundColor: 'white', borderRadius: "1px"}} class="input-group-text" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill" viewBox="0 0 16 16">
  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"></path>
</svg>
              </span>
  
                

                <FormControl
                    type="search"
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    placeholder="Search"
                    className="me-2 w-50"
                    aria-label="Search"
                    id="searching"
                    onChange={handleChangeSearchText}
                />
                <Link to={Paths.USERS_CREATE} className="btn btn-danger">
                    Add new user
                </Link>

            </Form>
            <Table hover size="sm" responsive>
                <thead>
                <tr>
                    <th
                        id="sortStaffcode"
                        onClick={handleClickSortBy}
                        style={{cursor: 'pointer'}}
                    >Staff Code {sortBy.sortStaffcode && getIconSort(sortBy.sortStaffcode && sortASC)}</th>
                    <th
                        id="sortLastName"
                        onClick={handleClickSortBy}
                        style={{cursor: 'pointer'}}>
                        Full Name {sortBy.sortLastName && getIconSort(sortBy.sortLastName && sortASC)}</th>
                    <th
                        id="sortUserName"
                        onClick={handleClickSortBy}
                        style={{cursor: 'pointer'}}>Username {sortBy.sortUserName && getIconSort(sortBy.sortUserName && sortASC)}</th>
                    <th
                        id="sortJoinedDate"
                        onClick={handleClickSortBy}
                        style={{cursor: 'pointer'}}>Joined Date {sortBy.sortJoinedDate && getIconSort(sortBy.sortJoinedDate && sortASC)}</th>
                    <th
                        id="sortType"
                        onClick={handleClickSortBy}
                        style={{cursor: 'pointer'}}>Type {sortBy.sortType && getIconAdminSort(sortBy.sortType && sortASC)}</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.data.map((user, index) =>
                        <tr key={user.staffcode}>
                            <td onClick={() => handleViewShow(user)}>{user.staffcode}</td>
                            <td onClick={() => handleViewShow(user)}>{user.lastName + " " + user.firstName}</td>
                            <td onClick={() => handleViewShow(user)}>{user.username}</td>
                            <td onClick={() => handleViewShow(user)}>{changeFormatDatetime(user.joinedDate)}</td>
                            <td onClick={() => handleViewShow(user)}>{user.isAdmin ? 'Admin' : 'Staff'}</td>
                            <td>
                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Edit">
                                <Link to={`${Paths.USERS_EDIT_PATH}/${user.staffcode}`} style={{cursor: "pointer"}}>
                                    <i className="fa-solid fa-pencil"/>
                                </Link>
                            </span>
                            </td>

                            <td>
                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Disable">
                                <XCircle style={{color: "red", cursor: "pointer"}} onClick={() => handleDisableShow(user)}/>
                            </span>
                                </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            <Stack direction="horizontal" gap={3}>
                <select aria-label="Page size"
                        className="p-1 rounded mt-0"
                        value={data.pageSize}
                        onChange={handleChangePageSize}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <span>records per page / Total records: {data.totalRecords}</span>
                <div className="ms-auto">
                    <Pagination className="my-auto">
                        <Pagination.Item>Total page: {data.totalPages} </Pagination.Item>
                        <Pagination.First onClick={() => handleChangePageNumber(data.firstPage)}/>
                        <Pagination.Prev onClick={() => handleChangePageNumber(data.previousPage)}/>
                        <Pagination.Item>{data.pageNumber}</Pagination.Item>
                        <Pagination.Next onClick={() => handleChangePageNumber(data.nextPage)}/>
                        <Pagination.Last onClick={() => handleChangePageNumber(data.lastPage)}/>
                    </Pagination>
                </div>
            </Stack>
            <ViewUserModal show={viewShow} onHide={handleViewClose} user={user}/>
            <DisableUserModal show={disableShow} onHide={handleDisableClose} user={disableUser}/>
            <ErrorModal show={errorShow} onHide={handleErrorClose}/>
        </div>
    );
}

