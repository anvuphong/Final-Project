import React, { useContext } from 'react';
import { Form, FormControl, Pagination, Stack, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from "axios";
import AuthContext from "../../../contexts/AuthContext";
import API from "../../../constants/Api";
import { Link } from "react-router-dom";
import Paths from "../../../constants/Paths";
import { XCircle, ArrowClockwise } from "react-bootstrap-icons";
import ModalView from "../Modal/ModalView"
import ModalDelete from '../Modal/ModalDelete';
import DatePicker from "react-datepicker";
import './AssignmentPage.css'
import backgroundFilter from './../img/filter.png'

export default function AssignmentPage() {
    const [dates, setDates] = useState([]);
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
    const [disableShow, setDisableShow] = useState(false);

    const [assignment, setAssignment] = useState({});
    const [disableAssignment, setDisableAssignment] = useState({});
    const [sortBy, setSortBy] = useState({
        sortNo: false,
        sortCode: false,
        sortName: false,
        sortTo: false,
        sortBy: false,
        sortDate: false,
        sortState: false
    });
    const [sortNoASC, setSortNoASC] = useState(null);
    const [sortCodeASC, setSortCodeASC] = useState(null);
    const [sortNameASC, setSortNameASC] = useState(null);
    const [sortToASC, setSortToASC] = useState(null);
    const [sortByASC, setSortByASC] = useState(null);
    const [sortDateASC, setSortDateASC] = useState(null);
    const [sortStateASC, setSortStateASC] = useState(null);

    const [searchValue, setSearchValue] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const searchParams = new URLSearchParams();

    // status
    const [statefilter, setStateFilter] = useState("4");

    const handleStateFilter = (event) => {
        setStateFilter(event.target.value);
        handleChangePageNumber(data.firstPage);
    }
    // Date
    const [datefilter, setDateFilter] = useState(null);

    const changeFormatDatetime = (value) => {
        let tempDatetime = new Date(value);
        return tempDatetime.toLocaleDateString('en-GB');
    }
    useEffect(() => {
        if (sortBy.sortNo) {
            searchParams.append("SortBy", "No");
        }
        if (sortBy.sortCode) {
            searchParams.append("SortBy", "AssignmentCode");
        }
        if (sortBy.sortName) {
            searchParams.append("SortBy", "AssignmentName");
        }
        if (sortBy.sortTo) {
            searchParams.append("SortBy", "AssignedTo");
        }
        if (sortBy.sortBy) {
            searchParams.append("SortBy", "AssignedBy");
        }
        if (sortBy.sortDate) {
            searchParams.append("SortBy", "AssignedDate");
        }
        if (sortBy.sortState) {
            searchParams.append("SortBy", "State");
        }
        if (sortNoASC !== null) {
            searchParams.append("SortType", sortNoASC ? "asc" : "desc");
        }
        if (sortCodeASC !== null) {
            searchParams.append("SortType", sortCodeASC ? "asc" : "desc");
        }
        if (sortNameASC !== null) {
            searchParams.append("SortType", sortNameASC ? "asc" : "desc");
        }
        if (sortToASC !== null) {
            searchParams.append("SortType", sortToASC ? "asc" : "desc");
        }
        if (sortByASC !== null) {
            searchParams.append("SortType", sortByASC ? "asc" : "desc");
        }
        if (sortDateASC !== null) {
            searchParams.append("SortType", sortDateASC ? "asc" : "desc");
        }
        if (sortStateASC !== null) {
            searchParams.append("SortType", sortStateASC ? "asc" : "desc");
        }
        if (searchValue.trim().length > 0) {
            searchParams.append("SearchBy", "AssetName");
            searchParams.append("SearchValue", searchValue);
        }
        searchParams.append("PageNumber", pageNumber);
        searchParams.append("PageSize", pageSize);
        searchParams.toString();


        const url = () => {
            let newUrl = `location=${ctx.location}&${searchParams.toString()}`
            if (statefilter !== "") {
                newUrl += `&status=${statefilter}`
            }
            if (datefilter !== null) {
                newUrl += `&date=${changeFormatDatetime(datefilter)}`
            }
            return newUrl
        }
        axios({
            method: "GET",
            url: `${API.ASSIGNMENT_LIST}?${url()} `,
            headers: {
                "Authorization": ctx.token
            }
        })
            .then(res => {
                setDates(res.data.data.assignmentDate);
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
    }, [sortBy, sortNoASC, sortCodeASC, sortNameASC, sortToASC, sortByASC, sortDateASC, sortStateASC, searchValue, pageNumber, pageSize, statefilter, datefilter]);
    const handleViewClose = () => setViewShow(false);
    const handleViewShow = (assignment) => {
        setAssignment(assignment);
        setViewShow(true);
    }
    const handleDisableClose = () => {
        setDisableShow(false);
    }
    const handleDisableShow = (disableAssignment) => {
        setDisableAssignment(disableAssignment);
        setDisableShow(true);
    }
    const handleClickSortBy = (event) => {
        if (event.target.id === 'No') {
            setSortNoASC(!sortNoASC);
            setSortCodeASC(null);
            setSortNameASC(null);
            setSortToASC(null);
            setSortByASC(null);
            setSortDateASC(null);
            setSortStateASC(null);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortNo: true,
                    sortCode: false,
                    sortName: false,
                    sortTo: false,
                    sortBy: false,
                    sortDate: false,
                    sortState: false
                };
            });
        }
        else if (event.target.id === 'AssetCode') {
            setSortCodeASC(!sortCodeASC);
            setSortNameASC(null);
            setSortNoASC(null);
            setSortToASC(null);
            setSortByASC(null);
            setSortDateASC(null);
            setSortStateASC(null);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortNo: false,
                    sortCode: true,
                    sortName: false,
                    sortTo: false,
                    sortBy: false,
                    sortDate: false,
                    sortState: false
                };
            });
        }
        else if (event.target.id === 'AssetName') {
            setSortNameASC(!sortNameASC);
            setSortNoASC(null);
            setSortCodeASC(null);
            setSortToASC(null);
            setSortByASC(null);
            setSortDateASC(null);
            setSortStateASC(null);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortNo: false,
                    sortCode: false,
                    sortName: true,
                    sortTo: false,
                    sortBy: false,
                    sortDate: false,
                    sortState: false
                };
            });
        }
        else if (event.target.id === 'AssignedTo') {
            setSortNameASC(null);
            setSortNoASC(null);
            setSortCodeASC(null);
            setSortToASC(!sortToASC);
            setSortByASC(null);
            setSortDateASC(null);
            setSortStateASC(null);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortNo: false,
                    sortCode: false,
                    sortName: false,
                    sortTo: true,
                    sortBy: false,
                    sortDate: false,
                    sortState: false
                };
            });
        }
        else if (event.target.id === 'AssignedBy') {
            setSortNameASC(null);
            setSortNoASC(null);
            setSortCodeASC(null);
            setSortToASC(null);
            setSortByASC(!sortByASC);
            setSortDateASC(null);
            setSortStateASC(null);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortNo: false,
                    sortCode: false,
                    sortName: false,
                    sortTo: false,
                    sortBy: true,
                    sortDate: false,
                    sortState: false
                };
            });
        }
        else if (event.target.id === 'Date') {
            setSortNameASC(null);
            setSortNoASC(null);
            setSortCodeASC(null);
            setSortToASC(null);
            setSortByASC(null);
            setSortDateASC(!sortDateASC);
            setSortStateASC(null);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortNo: false,
                    sortCode: false,
                    sortName: false,
                    sortTo: false,
                    sortBy: false,
                    sortDate: true,
                    sortState: false
                };
            });
        }
        else if (event.target.id === 'State') {
            setSortNameASC(null);
            setSortNoASC(null);
            setSortCodeASC(null);
            setSortToASC(null);
            setSortByASC(null);
            setSortDateASC(null);
            setSortStateASC(!sortStateASC);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortNo: false,
                    sortCode: false,
                    sortName: false,
                    sortTo: false,
                    sortBy: false,
                    sortDate: false,
                    sortState: true
                };
            });
        }
        else {
            setSortNameASC(null);
            setSortNoASC(!sortNoASC);
            setSortCodeASC(null);
            setSortToASC(null);
            setSortByASC(null);
            setSortDateASC(null);
            setSortStateASC(null);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortNo: true,
                    sortCode: false,
                    sortName: false,
                    sortTo: false,
                    sortBy: false,
                    sortDate: false,
                    sortState: false
                };
            });
        }
    };
    const handleChangePageSize = (e) => {
        setPageSize(e.target.value);
        handleChangePageNumber(data.firstPage);
    }
    const handleChangePageNumber = (number) => {
        setPageNumber(number);
    }
    const handleChangeSearchText = (e) => {
        setSearchValue(e.target.value);
        handleChangePageNumber(data.firstPage);
    }
    const getIconSort = (sort) => {
        switch (sort) {
            case true:
                return <i className="fas fa-sort-up"></i>;
            case false:
                return <i className="fas fa-sort-down"></i>;
            default:
                return;
        }
    }
    return (
        <div className='asset-list' style={{marginRight: '1%'}}>
            <h2 className='title'>Assignment List</h2>
            <div className="container" >
                <div className="row">
                    <div className="col-sm">
                        <select onChange={handleStateFilter} className='form-control' style={{
                            background: `url(${backgroundFilter})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '15px',
                            backgroundPosition: 'right',
                            width: "80%",
                            borderColor: "black",
                        }}>
                            <option value={"4"} >State</option>
                            <option value={"1"}>Waiting for acceptance</option>
                            <option value={"2"}>Accepted</option>
                            <option value={"3"}>Declined</option>
                        </select>

                    </div>
                    <div className="col-sm">
                        <DatePicker
                            onChange={setDateFilter} placeholderText="Assigned Date"
                            dateFormat="dd/MM/yyyy" isClearable
                            className='datePicker'
                        />
                    </div>
                    <div className="col-sm">
                        <Form className="d-flex mb-3 w-100">
                            <FormControl
                                type="search"
                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                id="searching"
                                onChange={handleChangeSearchText}
                                style={{ borderColor: "black",float:"right", width:"90%"}}
                            />
                        </Form>
                    </div>
                    <div className="col-sm">
                        <Link to={Paths.ASSIGNMENTS_ADD} className="btn btn-danger" style={{
                            float:"right",
                            width: '100%', height: '40px',
                        }}>
                            Create new assignment
                        </Link>
                    </div>
                </div>
            </div>
            <Table hover size="sm" responsive>
                <thead>
                    <tr>
                        <th id="No"
                            onClick={handleClickSortBy}
                            style={{ cursor: 'pointer' }}>
                            No {sortBy.sortNo && getIconSort(sortBy.sortNo && sortNoASC)}
                        </th>
                        <th id="AssetCode"
                            onClick={handleClickSortBy} style={{ cursor: 'pointer' }}>
                            Asset Code {sortBy.sortCode && getIconSort(sortBy.sortCode && sortCodeASC)}
                        </th>
                        <th id="AssetName"
                            onClick={handleClickSortBy} style={{ cursor: 'pointer' }}>
                            Asset Name {sortBy.sortName && getIconSort(sortBy.sortName && sortNameASC)}
                        </th>
                        <th id="AssignedTo"
                            onClick={handleClickSortBy} style={{ cursor: 'pointer' }}>
                            Assigned to {sortBy.sortTo && getIconSort(sortBy.sortTo && sortToASC)}
                        </th>
                        <th id="AssignedBy"
                            onClick={handleClickSortBy} style={{ cursor: 'pointer' }}>
                            Assigned by {sortBy.sortBy && getIconSort(sortBy.sortBy && sortByASC)}
                        </th>
                        <th id="Date"
                            onClick={handleClickSortBy} style={{ cursor: 'pointer' }}>
                            Assigned Date {sortBy.sortDate && getIconSort(sortBy.sortDate && sortDateASC)}
                        </th>
                        <th id="State"
                            onClick={handleClickSortBy} style={{ cursor: 'pointer' }}>
                            State {sortBy.sortState && getIconSort(sortBy.sortState && sortStateASC)}
                        </th>
                        <th className='action-column'> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.data.map((assignment, index) =>
                            <tr key={index}>
                                <td onClick={() => handleViewShow(assignment)}>{index + 1}</td>
                                <td onClick={() => handleViewShow(assignment)}>{assignment.assetCode}</td>
                                <td onClick={() => handleViewShow(assignment)}>{assignment.assetName}</td>
                                <td onClick={() => handleViewShow(assignment)}>{assignment.assignedToName}</td>
                                <td onClick={() => handleViewShow(assignment)}>{assignment.assignedByName}</td>
                                <td onClick={() => handleViewShow(assignment)}>{changeFormatDatetime(assignment.assignmentDate)}</td>
                                <td onClick={() => handleViewShow(assignment)}>
                                    {assignment.stateId === 1 && (<div>Waiting for acceptance</div>)}
                                    {assignment.stateId === 2 && (<div>Accepted</div>)}
                                    {assignment.stateId === 3 && (<div>Declined</div>)}
                                </td>
                                <td></td>
                                <td>
                                    {assignment.stateId === 2 && <div><i className="fa-solid fa-pencil" /></div>}
                                    {assignment.stateId !== 2 && <div><Link to={`${Paths.ASSIGNMENTS_EDIT_PATH}/${assignment.assignmentId}`}><i className="fa-solid fa-pencil" /></Link></div>}
                                    {/* <i className="fa-solid fa-pencil" tabIndex="0" data-toggle="tooltip" title="Edit"/> */}
                                </td>
                                <td>
                                    {assignment.stateId === 2 && <div><span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Delete">
                                        <XCircle style={{ color: "BurlyWood" }} />
                                    </span></div>}
                                    {assignment.stateId !== 2 && <div><span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Delete">
                                        <XCircle style={{ color: "red", cursor: "pointer" }}
                                            onClick={() => handleDisableShow(assignment)} />
                                    </span></div>}
                                </td>
                                <td><ArrowClockwise style={{ stroke: "blue", strokeWidth: "1.5" }} /></td>
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
                        <Pagination.First onClick={() => handleChangePageNumber(data.firstPage)} />
                        <Pagination.Prev onClick={() => handleChangePageNumber(data.previousPage)} />
                        <Pagination.Item>{data.pageNumber}</Pagination.Item>
                        <Pagination.Next onClick={() => handleChangePageNumber(data.nextPage)} />
                        <Pagination.Last onClick={() => handleChangePageNumber(data.lastPage)} />
                    </Pagination>
                </div>
            </Stack>
            <ModalView show={viewShow} onHide={handleViewClose} assignment={assignment} />
            <ModalDelete show={disableShow} onHide={handleDisableClose} assignment={disableAssignment} />
        </div>
    );
}

