import React, {useEffect, useState, useContext} from 'react';
import {Form, FormControl, Pagination, Stack, Table} from 'react-bootstrap';
import axios from "axios";
import API from '../../constants/Api';
import {Check} from "react-bootstrap-icons";
import { BsX,BsArrowCounterclockwise } from "react-icons/bs";
import {Link} from "react-router-dom";
import Paths from "../../constants/Paths";
import AuthContext from "../../contexts/AuthContext";
import ViewAssignmentModal from './ViewAssignmentModal';
import RespondModal from './RespondModal';
import DeclineRespondModal from './DeclineRespondModal';

import FirstChangePasswordModal from "../AuthenticationPage/FirstChangePasswordModal/FirstChangePasswordModal";

export default function HomePage() {
    const ctx = useContext(AuthContext);
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
    const [respondShow, setRespondShow] = useState(false);
    const [declineRespondShow, setDeclineRespondShow] = useState(false);
    const [assignment, setAssignment] = useState({});
    const [declineAssignment, setDeclineAssignment] = useState({});
    const [respondAssignment, setRespondAssignment] = useState({});
    const [sortBy, setSortBy] = useState({
        sortAssetCode: false,
        sortAssetName: false,
        sortAssignmentDate: false,
        sortStateId: false,
    });
    const [sortASC, setSortASC] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const searchParams = new URLSearchParams();
    const [modalFirstChangePasswordShow, setModalFirstChangePasswordShow] = useState(ctx.logCount === 0);
    const handleModalFirstChangePasswordClose = () => setModalFirstChangePasswordShow(false);
    const handleModalFirstChangePasswordOpen = () => setModalFirstChangePasswordShow(true);
    

    const changeFormatDatetime = (value) => {
        let tempDatetime = new Date(value);
        return tempDatetime.toLocaleDateString('en-GB');
    }

    useEffect(() => {
        if (sortBy.sortAssetCode) {
            searchParams.append("SortBy", "AssignmentCode");
        }
        if (sortBy.sortAssetName) {
            searchParams.append("SortBy", "AssignmentName");
        }
        if (sortBy.sortAssignmentDate) {
            searchParams.append("SortBy", "AssignedDate");
        }
        
        if (sortBy.sortStateId) {
            searchParams.append("SortBy", "StateId");
        }

        if (sortASC !== null) {
            searchParams.append("SortType", sortASC ? "asc" : "desc");
        }

        searchParams.append("PageNumber", pageNumber);
        searchParams.append("PageSize", pageSize);
        searchParams.toString();
        const url = () => {
            let newUrl = `staffcode=${ctx.staffcode}&${searchParams.toString()}`
            return newUrl
        }
        axios({
            method: "GET",
            url: `${API.ASSIGNMENT_USER}?${url()} `,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": ctx.token
            }
        })
            .then(res => {
                setAssignment(res.data);
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
    }, [sortBy,  sortASC, pageNumber, pageSize]);

    const handleChangePageSize = (e) => {
        setPageSize(e.target.value);
        setPageNumber(1);   
    }

    const handleChangePageNumber = (number) => {
        setPageNumber(number);
    }

    const handleViewClose = () => setViewShow(false);
    const handleViewShow = (assignment) => {
        setAssignment(assignment);
        setViewShow(true);
    }

    const handleRespondShow = (respondAssignment) => {
        setRespondAssignment(respondAssignment);
        setRespondShow(true);
            
    }
    const handleRespondClose = () => {
        setRespondShow(false);
    }
    const handleDeclineRespondShow = (declineAssignment) => {
        setDeclineAssignment(declineAssignment);
        setDeclineRespondShow(true);
    }
    const handleDeclineRespondClose = () => {
        setDeclineRespondShow(false);
    }
    const handleClickSortBy = (event) => {
        if (event.target.id === 'sortAssetCode') {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortAssetCode: true,
                    sortAssetName: false,
                    sortAssignmentDate: false,
                    sortStateId: false,
                };
            });
        }
        else if (event.target.id === 'sortAssetName') {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortAssetCode: false,
                    sortAssetName: true,
                    sortAssignmentDate: false,
                    sortStateId: false,
                };
            });
        }
         else if (event.target.id === 'sortAssignmentDate') {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortAssetCode: false,
                    sortAssetName: false,
                    sortAssignmentDate: true,
                    sortStateId: false,
                };
            });
        } else {
            setSortASC(!sortASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortAssetCode: false,
                    sortAssetName: false,
                    sortAssignmentDate: false,
                    sortStateId: true,
                };
            });
        }
    };
    const getIconSort = (sort) => {
        switch (sort) {
            case false:
                return <i className="fas fa-sort-down"></i>;
            case true:
                return <i className="fas fa-sort-up"></i>;
            default:
                return;
        }
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


    return (
        <div className="me-5">
            <div style={{color: 'red'}}>
                <h5>My Assignment</h5>
            </div>

            <Table hover size="sm" responsive>
                <thead>
                <tr>
                    <th
                        id="sortAssetCode"
                        onClick={handleClickSortBy}
                        style={{cursor: 'pointer'}}
                    >Asset Code {sortBy.sortAssetCode && getIconSort(sortBy.sortAssetCode && sortASC)}</th>
                    <th
                        id="sortAssetName"
                        onClick={handleClickSortBy}
                        style={{cursor: 'pointer'}}>
                        Asset Name {sortBy.sortAssetName && getIconSort(sortBy.sortAssetName && sortASC)}</th>
                    <th
                        id="sortAssignmentDate"
                        onClick={handleClickSortBy}
                        style={{cursor: 'pointer'}}>Assigned Date {sortBy.sortAssignmentDate && getIconSort(sortBy.sortAssignmentDate && sortASC)}</th>
                    <th
                        id="sortStateId"
                        onClick={handleClickSortBy}
                        style={{cursor: 'pointer'}}>State {sortBy.sortStateId && getIconSort(sortBy.sortStateId && sortASC)}</th>
                    <th className='action-column'> </th>
                </tr>
                </thead>
                <tbody>
                {
                    data.data.map((a, index) =>
                        <tr key={index+1}>
                            <td onClick={() => handleViewShow(a)}>{a.assetCode}</td>
                            <td onClick={() => handleViewShow(a)}>{a.assetName}</td>
                            <td onClick={() => handleViewShow(a)}>{changeFormatDatetime(a.assignmentDate)}</td>
                            <td onClick={() => handleViewShow(a)}>{handleStateName(a.stateId)}</td>

                            <td >
                                {
                                    a.stateId === 1 &&
                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Accept">
                                <Check style={{color: "red", cursor: "pointer"}} 
                                onClick={() => handleRespondShow(a)}
                                />
                            </span>
                                }
                                {
                                    a.stateId === 2 &&
                                    <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Accept">
                                <Check style={{color: "BurlyWood", cursor: "pointer"}} 
                                />
                            </span>
                            }
                             {
                                    a.stateId === 1 &&
                                    <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Decline">
                                    <BsX  style={{color:"danger", cursor: "pointer"}} 
                                    onClick={() => handleDeclineRespondShow(a)}
                                    />
                                </span>
                                }
                                {
                                    a.stateId === 2 &&
                                <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Decline">
                                <BsX  style={{color:"BurlyWood", cursor: "pointer"}} 
                                />
                            </span>
                            }

                
                            <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Reload">
                            <BsArrowCounterclockwise style={{color:"blue",cursor: "pointer"}} 
                                onClick={() => window.location.reload()}
                                />
                            </span>
                            
                                </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            <Stack direction="horizontal" gap={3}>
                <select  aria-label="Page size"
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
            <ViewAssignmentModal show={viewShow} onHide={handleViewClose} assignment={assignment}/>
            <RespondModal show={respondShow} onHide={handleRespondClose} assignment={respondAssignment}/>
            <DeclineRespondModal show={declineRespondShow} onHide={handleDeclineRespondClose} assignment={declineAssignment}/>
            <FirstChangePasswordModal
                show={modalFirstChangePasswordShow}
                handleClose={handleModalFirstChangePasswordClose} />
        </div>
    );
}

