import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";

const AssetListModal = (props) => {
    const [assetResponse, setAssetResponse] = useState({
        assetCode: '',
    });

    //Filter State
    const [searchText, setSearchText] = useState('');
    const [assetListFilter, setAssetListFilter] = useState([]);
    const [sortBy, setSortBy] = useState('sortAssetCode');
    const [sortASC, setSortASC] = useState(true);

    const handleShow = () => {
        setAssetListFilter(props.assetlist);
        setAssetResponse({
            assetCode: props.assetcode,
        })
    }

    const handleChooseAsset = (asset) => {
        setAssetResponse({
            assetCode: asset.assetCode,
        })
    }

    //Search by code or name
    const handleSrearchChange = (evt) => {
        setSearchText(evt.target.value);
        setAssetListFilter(props.assetlist.filter(asset =>
            asset.assetCode.toLowerCase().includes(evt.target.value.toLowerCase()) ||
            asset.assetName.toLowerCase().includes(evt.target.value.toLowerCase())
        ))
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

    const getAssetListSorted = () => {
        if (sortBy === 'sortAssetCode') {
            if (sortASC) {
                return assetListFilter.sort((asset1, asset2) => {
                    if (asset1.assetCode.toLowerCase() < asset2.assetCode.toLowerCase()) return -1;
                    if (asset1.assetCode.toLowerCase() > asset2.assetCode.toLowerCase()) return 1;
                })
            } else {
                return assetListFilter.sort((asset1, asset2) => {
                    if (asset1.assetCode.toLowerCase() > asset2.assetCode.toLowerCase()) return -1;
                    if (asset1.assetCode.toLowerCase() < asset2.assetCode.toLowerCase()) return 1;
                })
            }
        }
        if (sortBy === 'sortAssetName') {
            if (sortASC) {
                return assetListFilter.sort((asset1, asset2) => {
                    if (asset1.assetName.toLowerCase() < asset2.assetName.toLowerCase()) return -1;
                    if (asset1.assetName.toLowerCase() > asset2.assetName.toLowerCase()) return 1;
                })
            } else {
                return assetListFilter.sort((asset1, asset2) => {
                    if (asset1.assetName.toLowerCase() > asset2.assetName.toLowerCase()) return -1;
                    if (asset1.assetName.toLowerCase() < asset2.assetName.toLowerCase()) return 1;
                })
            }
        }
        if (sortBy === 'sortCategory') {
            if (sortASC) {
                return assetListFilter.sort((asset1, asset2) => {
                    if (asset1.categoryName.toLowerCase() < asset2.categoryName.toLowerCase()) return -1;
                    if (asset1.categoryName.toLowerCase() > asset2.categoryName.toLowerCase()) return 1;
                })
            } else {
                return assetListFilter.sort((asset1, asset2) => {
                    if (asset1.categoryName.toLowerCase() > asset2.categoryName.toLowerCase()) return -1;
                    if (asset1.categoryName.toLowerCase() < asset2.categoryName.toLowerCase()) return 1;
                })
            }
        }
    }
    const assetListSorted = getAssetListSorted();

    const handleSave = () => {
        if (assetResponse.assetCode === '') {
            props.onHide();
        } else {
            props.onHide(assetResponse);
        }
    }

    const handleCancel = () => {
        setAssetResponse({
            assetCode: '',
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
                <Modal.Title as={Col} id="select-asset-modal-title">
                    <h5>Select Asset</h5>
                </Modal.Title>
                <Col md={{ span: 4 }}>
                    <InputGroup >
                        <Form.Control id="seacrh-asset" name="asset" type="text"
                            value={searchText}
                            onChange={(evt) => handleSrearchChange(evt)}
                        />
                        <Button variant="outline-secondary" id="search-user-button" disabled={true}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </InputGroup>
                </Col>
            </Modal.Header>
            <Modal.Body style={{ height: '500px', overflow: 'auto' }} >
                <Table hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th onClick={handleClickSortBy} id="sortAssetCode" style={{ cursor: 'pointer' }}>Asset Code</th>
                            <th onClick={handleClickSortBy} id="sortAssetName" style={{ cursor: 'pointer' }}>Asset Name</th>
                            <th onClick={handleClickSortBy} id="sortCategory" style={{ cursor: 'pointer' }}>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assetListSorted.map(asset => (
                            <tr key={asset.assetCode} onClick={() => handleChooseAsset(asset)}>
                                <td style={{ width: '10%' }}><Form.Check type="radio" checked={assetResponse.assetCode === asset.assetCode} readOnly name="asset" id={asset.assetCode} value={asset.assetCode} /></td>
                                <td style={{ width: '15%' }}><Form.Label htmlFor={asset.assetCode}>{asset.assetCode}</Form.Label></td>
                                <td style={{ width: '45%' }}><Form.Label htmlFor={asset.assetCode}>{asset.assetName}</Form.Label></td>
                                <td style={{ width: '30%' }}><Form.Label htmlFor={asset.assetCode}>{asset.categoryName}</Form.Label></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleSave}>Save</Button>
                <Button variant="outline-secondary" onClick={() => handleCancel()}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default AssetListModal;