import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import API from "../../constants/Api";
import CategoryAddModal from "./CategoryAddModal";
import { Link, useNavigate } from "react-router-dom";
import Paths from "../../constants/Paths";
import AuthContext from "../../contexts/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AssetAdd = () => {
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);
    const [asset, setAsset] = useState({
        name: '',
        category: '0',
        specification: '',
        installedDate: '',
        state: '0'
    });
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalShow, setModalShow] = useState(false);

    //Get Categories Api
    useEffect(() => {
        let isCancel = false;
        axios({
            method: 'GET',
            url: `${API.CATEGORY_LIST}`,
            headers: {
                "Authorization": ctx.token
            }
        }).then(response => {
            if (!isCancel) {
                setCategories(response.data);
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
    }, [!modalShow]);

    //Request status
    if (isLoading) return (
        <div>Loading</div>
    )

    //Categories sort
    const categoriesSort = categories.sort((cate1, cate2) => cate2.categoryId - cate1.categoryId);

    const handleInputChange = (evt) => {
        console.log(evt)
        setAsset({
            ...asset,
            [evt.target.name]: evt.target.value
        });
    }
    console.log('actual', asset.installedDate)
    const handleDateChange = (date) => {
        console.log(date)
        setAsset({
            ...asset,
            installedDate: date
        })
    }

    const isValidForm = asset.name === '' ||
        asset.category === '0' ||
        asset.specification === '' ||
        asset.installedDate === '' ||
        asset.state === '0';

    const handleOnSubmit = (evt) => {
        let isCancel = false;
        evt.preventDefault();
        let actualDate = asset.installedDate;
        actualDate.setDate(asset.installedDate.getDate() + 1);
        axios({
            method: 'POST',
            url: `${API.ASSET_CREATE}`,
            data: {
                assetName: asset.name,
                specification: asset.specification,
                installedDate: actualDate,
                stateId: Number(asset.state),
                location: ctx.location,
                quantity: '0',
                categoryId: Number(asset.category)
            },
            headers: {
                "Authorization": ctx.token
            }
        }).then((response) => {
            navigate(Paths.ASSETS);
        }).catch((error) => {
            if (!isCancel) {
                setIsLoading(false);
                setError('Something wrong');
            }
        });
        setAsset({
            name: '',
            category: '0',
            specification: '',
            installedDate: '',
            state: '0'
        });
        return () => {
            isCancel = true;
        }
    }

    const handleCreateCategory = (evt) => {
        setModalShow(true)
    }

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <CategoryAddModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                }}
                categories={categories}
            />

            <Form onSubmit={handleOnSubmit}>
                <Form.Label as={'h4'}>Create New Asset</Form.Label>
                <Form.Group className="add" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control id="asset-add-input-name" name="name" type="text" onChange={handleInputChange} value={asset.name} />
                    <Form.Text muted>
                        Enter Name.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="add" >
                    <Form.Label>Category</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Select id="asset-add-input-category" value={Number(asset.category)} name="category" onChange={handleInputChange} isInvalid={error}>
                            <option value={0}>Choose a Category</option>
                            {categoriesSort.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                            ))}
                        </Form.Select>
                        <Button variant="outline-secondary" onClick={handleCreateCategory} id="asset-add-new-category-button">
                            New
                        </Button>
                        <Form.Control.Feedback type="invalid">
                            Something wrong.
                        </Form.Control.Feedback>

                    </InputGroup>
                    <Form.Text muted>
                        Choose a Category.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="add" >
                    <Form.Label>Specification</Form.Label>
                    <Form.Control id="asset-add-input-specification" name="specification" as="textarea" rows={3} onChange={handleInputChange} value={asset.specification} />
                    <Form.Text muted>
                        Enter Specification.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="add">
                    <Form.Label>Install Date</Form.Label>
                    <Form.Control
                        as={DatePicker}
                        name="installedDate"
                        id="asset-add-input-install-date"
                        selected={asset.installedDate}
                        onChange={(date) => handleDateChange(date)}
                        dateFormat="dd/MM/yyyy"
                    />
                    <i className="fa-solid fa-calendar-days create-user__icon-calendar" />
                    <Form.Text muted>
                        Enter Install Date.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="add">
                    <Form.Label>State</Form.Label>
                    <Form.Check type='radio' name="state" id='asset-add-input-state-available' value={1} defaultChecked={Number(asset.state) === 1} onClick={handleInputChange} label='Available' />
                    <Form.Check type='radio' name="state" id='asset-add-input-state-not-available' value={2} defaultChecked={Number(asset.state) === 2} onClick={handleInputChange} label='Not Available' />
                </Form.Group>

                <Button type='submit' variant="danger" disabled={isValidForm} style={{ marginRight: '20px' }}>Save</Button>
                <Link to={Paths.ASSETS} className="btn btn-outline-secondary px-3">Cancel</Link>
            </Form>
        </div>
    )
}
export default AssetAdd;