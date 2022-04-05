import React, { useContext } from 'react';
import { Form, FormControl, Pagination, Stack, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ViewAssetModal from '../ViewAssetModal';
import DeleteModal from '../AssetDelete/DeleteModal';
import ErrorDeleteModal from '../AssetDelete/ErrorDeleteModal';
import axios from "axios";
import './AssetPage.css'
import backgroundFilter from './images/filter.png'
import AuthContext from "../../../contexts/AuthContext";
import API from "../../../constants/Api";
import { Link } from "react-router-dom";
import Paths from "../../../constants/Paths";
import { XCircle } from "react-bootstrap-icons";

export default function AssetPage() {
    const [categories, setCategories] = useState([]);
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
    const [errorShow, setErrorShow] = useState(false);

    const [asset, setAsset] = useState({});
    const [disableAsset, setDisableAsset] = useState({});
    const [sortBy, setSortBy] = useState({
        sortAssetCode: false,
        sortAssetName: false,
        sortAssetCategory: false,
        sortAssetState: false
    });

    const [sortASC, setSortASC] = useState(null);
    const [sortCodeASC, setSortCodeASC] = useState(null);
    const [sortNameASC, setSortNameASC] = useState(null);
    const [sortCateASC, setSortCateASC] = useState(null);
    const [sortStateASC, setSortStateASC] = useState(null);

    const [searchValue, setSearchValue] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const searchParams = new URLSearchParams();

    // status
    const [statefilter, setStateFilter] = useState("6");

    const handleStateFilter = (event) => {
        setStateFilter(event.target.value);
        handleChangePageNumber(data.firstPage);
    }
    // category
    const [categoryfilter, setCategoryFilter] = useState("0");
    const handleCategoryFilter = (event) => {
        setCategoryFilter(event.target.value);
        handleChangePageNumber(data.firstPage);
    }
    useEffect(() => {
        if (sortBy.sortAssetCode) {
            searchParams.append("SortBy", "AssetCode");
        }
        if (sortBy.sortAssetName) {
            searchParams.append("SortBy", "AssetName");
        }
        if (sortBy.sortAssetCategory) {
            searchParams.append("SortBy", "Category");
        }
        if (sortBy.sortAssetState) {
            searchParams.append("SortBy", "State");
        }
        if (sortCodeASC !== null) {
            searchParams.append("SortType", sortCodeASC ? "asc" : "desc");
        }
        if (sortNameASC !== null) {
            searchParams.append("SortType", sortNameASC ? "asc" : "desc");
        }
        if (sortCateASC !== null) {
            searchParams.append("SortType", sortCateASC ? "asc" : "desc");
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
        axios({
            method: "GET",
            url: `${API.CATEGORY_LIST}`,
            headers: {
                "Authorization": ctx.token,
            }
        })
            .then(res => {
                setCategories(res.data);
            }, [])


        const url = () => {
            let newUrl = `location=${ctx.location}&${searchParams.toString()}`
            // let newUrl = `location=Ha%20noi&${searchParams.toString()}`
            if (statefilter !== "") {
                newUrl += `&status=${statefilter}`
            }
            if (categoryfilter !== "") {
                newUrl += `&categoryid=${categoryfilter}`
            }
            return newUrl
        }
        axios({
            method: "GET",
            url: `${API.ASSET_LIST}?${url()} `,
            headers: {
                "Authorization": ctx.token
            }
        })
            .then(res => {
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
    }, [sortBy, sortCodeASC, sortNameASC, sortCateASC, sortStateASC, searchValue, pageNumber, pageSize, statefilter, categoryfilter]);
    const handleViewClose = () => setViewShow(false);
    const handleViewShow = (asset) => {
        setAsset(asset);
        setViewShow(true);
    }
    const handleErrorClose = () => setErrorShow(false);
    const handleDisableClose = () => {
        setDisableShow(false);
    }
    const handleDisableShow = (disableAsset) => {
        axios({
            method: "GET",
            url: `${API.CHECK_ASSET}?assetCode=${disableAsset.assetCode}`,
            headers: {
                "Authorization": ctx.token
            }
        })
            .then(function (response) {
                if (response.data === true) {
                    setDisableAsset(disableAsset);
                    setDisableShow(true);
                } else {
                    setDisableAsset(disableAsset);
                    setErrorShow(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            }
            );
    }
    const handleClickSortBy = (event) => {
        if (event.target.id === 'AssetCode') {
            setSortCodeASC(!sortCodeASC);
            setSortNameASC(null);
            setSortCateASC(null);
            setSortStateASC(null);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortAssetCode: true,
                    sortAssetName: false,
                    sortAssetCategory: false,
                    sortAssetState: false
                };
            });
        }
        else if (event.target.id === 'AssetName') {
            setSortNameASC(!sortNameASC);
            setSortCodeASC(null);
            setSortCateASC(null);
            setSortStateASC(null);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortAssetCode: false,
                    sortAssetName: true,
                    sortAssetCategory: false,
                    sortAssetState: false
                };
            });
        }
        else if (event.target.id === 'State') {
            setSortStateASC(!sortStateASC);
            setSortCodeASC(null);
            setSortCateASC(null);
            setSortNameASC(null);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortAssetCode: false,
                    sortAssetName: false,
                    sortAssetCategory: false,
                    sortAssetState: true
                };
            });
        }
        else if (event.target.id === 'Category') {
            setSortCateASC(!sortCateASC);
            setSortNameASC(null);
            setSortCodeASC(null);
            setSortStateASC(null);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortAssetCode: false,
                    sortAssetName: false,
                    sortAssetCategory: true,
                    sortAssetState: false
                };
            });
        }
        else {
            setSortCodeASC(!sortCodeASC);
            setSortNameASC(null);
            setSortCateASC(null);
            setSortStateASC(null);
            setSortBy((prevState) => {
                return {
                    ...prevState,
                    sortAssetCode: false,
                    sortAssetName: true,
                    sortAssetCategory: false,
                    sortAssetState: false
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
        <div className='asset-list' style={{ marginRight: '20px' }}>
            <h2 className='title'>Asset List</h2>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <select onChange={handleStateFilter} className='form-control' style={{
                            background: `url(${backgroundFilter})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '20px',
                            backgroundPosition: 'right',
                        }}>
                            <option value={"6"} >State</option>
                            <option value={"1"}>Available</option>
                            <option value={"2"}>Not Available</option>
                            <option value={"3"}>Waiting for recycle</option>
                            <option value={"4"}>Recycled</option>
                            <option value={"5"}>Assigned</option>
                        </select>

                    </div>
                    <div className="col-sm">
                        <select onChange={handleCategoryFilter} className='form-control' style={{
                            background: `url(${backgroundFilter})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '20px',
                            backgroundPosition: 'right',
                            paddingRight: '40px'
                        }}>
                            <option value="0" >Category</option>
                            {
                                categories?.map(cate => (
                                    <option key={cate.categoryId} value={cate.categoryId}>{cate.categoryName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-sm">
                        <Form >
                            <FormControl
                                type="search"
                                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                id="searching"
                                onChange={handleChangeSearchText}
                            />
                        </Form>
                    </div>
                    <div className="col-sm">
                        <Link to={Paths.ASSETS_ADD} className="btn btn-danger">
                            Create new asset
                        </Link>
                    </div>
                </div>
            </div>
            <Table className='asset-table'>
                <thead>
                    <tr>
                        <th id="AssetCode"
                            onClick={handleClickSortBy}
                            style={{ cursor: 'pointer' }}>
                            Asset Code {sortBy.sortAssetCode && getIconSort(sortBy.sortAssetCode && sortCodeASC)}
                        </th>
                        <th id="AssetName"
                            onClick={handleClickSortBy} style={{ cursor: 'pointer' }}>
                            Asset Name {sortBy.sortAssetName && getIconSort(sortBy.sortAssetName && sortNameASC)}
                        </th>
                        <th id="Category"
                            onClick={handleClickSortBy} style={{ cursor: 'pointer' }}>
                            Category {sortBy.sortAssetCategory && getIconSort(sortBy.sortAssetCategory && sortCateASC)}
                        </th>
                        <th id="State"
                            onClick={handleClickSortBy} style={{ cursor: 'pointer' }}>
                            State {sortBy.sortAssetState && getIconSort(sortBy.sortAssetState && sortStateASC)}
                        </th>
                        <th className='action-column'> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.data.map((asset, index) =>
                            <tr key={index}>
                                <td onClick={() => handleViewShow(asset)}>{asset.assetCode}</td>
                                <td onClick={() => handleViewShow(asset)}>{asset.assetName}</td>
                                <td onClick={() => handleViewShow(asset)}>{asset.categoryName}</td>
                                <td onClick={() => handleViewShow(asset)}>
                                    {asset.stateId === 1 && (<div>Available</div>)}
                                    {asset.stateId === 2 && (<div>Not Available</div>)}
                                    {asset.stateId === 3 && (<div>Waiting for recycle</div>)}   {/*waiting for recycle */}
                                    {asset.stateId === 4 && (<div>Recycled</div>)}              {/*recycled */}
                                    {asset.stateId === 5 && (<div>Assigned</div>)}              {/*assigned */}
                                </td>
                                <td></td>
                                <td>{asset.stateId === 5 && <div><i className="fa-solid fa-pencil" /></div>}
                                    {asset.stateId !== 5 && <div><Link to={`${Paths.ASSETS_EDIT_PATH}/${asset.assetCode}`}><i className="fa-solid fa-pencil" tabIndex="0" data-toggle="tooltip" title="Edit"/></Link></div>}
                                </td>
                                <td>
                                    {asset.stateId === 5 && <div><span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Delete">
                                        <XCircle style={{ color: "BurlyWood" }} />
                                    </span></div>}
                                    {asset.stateId !== 5 && <div><span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Delete">
                                        <XCircle style={{ color: "red", cursor: "pointer" }}
                                            onClick={() => handleDisableShow(asset)} />
                                    </span></div>}
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
                        <Pagination.First onClick={() => handleChangePageNumber(data.firstPage)} />
                        <Pagination.Prev onClick={() => handleChangePageNumber(data.previousPage)} />
                        <Pagination.Item>{data.pageNumber}</Pagination.Item>
                        <Pagination.Next onClick={() => handleChangePageNumber(data.nextPage)} />
                        <Pagination.Last onClick={() => handleChangePageNumber(data.lastPage)} />
                    </Pagination>
                </div>
            </Stack>
            <ViewAssetModal show={viewShow} onHide={handleViewClose} asset={asset} />
            <DeleteModal show={disableShow} onHide={handleDisableClose} asset={disableAsset} />
            <ErrorDeleteModal show={errorShow} onHide={handleErrorClose} asset={disableAsset} />
        </div>
    );
}

