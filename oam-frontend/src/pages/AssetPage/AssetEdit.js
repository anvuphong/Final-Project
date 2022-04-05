import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../../constants/Api";
import Paths from "../../constants/Paths";
import AuthContext from "../../contexts/AuthContext";

const AssetEdit = (props) => {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const assetCode = useParams().assetCode;
    const [asset, setAsset] = useState({
        name: '',
        specification: '',
        installedDate: '',
        state: ''
    });
    const [category, setCategory] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            let isCancel = false;
            let categoryId;
            await axios({
                method: 'GET',
                url: `${API.ASSET_DETAIL}/${assetCode}`,
                headers: {
                    "Authorization": ctx.token
                }
            }).then(respone => {
                if (!isCancel) {
                    setAsset({
                        name: respone.data.assetName,
                        specification: respone.data.specification,
                        installedDate: respone.data.installedDate.split('T')[0],
                        state: respone.data.stateId
                    });
                    categoryId = respone.data.categoryId;
                    setIsLoading(false);
                }
            }).catch((error) => {
                if (!isCancel) {
                    setIsLoading(false);
                    setError('Something wrong');
                }
            });
            await axios({
                method: 'GET',
                url: `${API.CATEGORY}/${categoryId}`,
                headers: {
                    "Authorization": ctx.token
                }
            }).then(respone => {
                if (!isCancel) {
                    setCategory(respone.data.categoryName);
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
        })();
    }, []);

    if (isLoading) return (
        <div>Loading</div>
    )
    if (error) return (
        <div style={{ color: 'red' }}>{error}</div>
    )

    console.log(asset)
    const handleInputChange = (evt) => {
        setAsset({
            ...asset,
            [evt.target.name]: evt.target.value
        });
    }

    const isValidForm = asset.name === '' ||
        category === '' ||
        asset.specification === '' ||
        asset.installedDate === '' ||
        asset.state === '0';

    const handleOnSubmit = (evt) => {
        let isCancel = false;
        evt.preventDefault();
        axios({
            method: 'PUT',
            url: `${API.ASSET_EDIT}/${assetCode}`,
            data: {
                assetName: asset.name,
                specification: asset.specification,
                installedDate: asset.installedDate,
                stateId: Number(asset.state)
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
            specification: '',
            installedDate: '',
            state: '0'
        });
        return () => {
            isCancel = true;
        }
    }

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <Form onSubmit={handleOnSubmit}>
                <Form.Label as={'h4'}>Edit Asset</Form.Label>
                <Form.Group className="edit" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control id="asset-edit-input-name" name="name" type="text" onChange={handleInputChange} value={asset.name} />
                    <Form.Text muted>
                        Enter Name.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="edit" >
                    <Form.Label>Category</Form.Label>
                    <Form.Select id="asset-edit-input-category" value={0} name="category" disabled={true}>
                        <option value={0}>{category}</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="edit" >
                    <Form.Label>Specification</Form.Label>
                    <Form.Control id="asset-edit-input-specification" name="specification" as="textarea" rows={3} onChange={handleInputChange} value={asset.specification} />
                    <Form.Text muted>
                        Enter Specification.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="edit">
                    <Form.Label>Install Date</Form.Label>
                    <Form.Control id="asset-edit-input-install-date" name="installedDate" type="date" onChange={handleInputChange} value={asset.installedDate} />
                    <Form.Text muted>
                        Enter Install Date.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="add">
                    <Form.Label>State</Form.Label>
                    <Form.Check type='radio' name="state" id='asset-add-input-state-available'
                        value={1} defaultChecked={Number(asset.state) === 1} onClick={handleInputChange} label='Available'
                    />
                    <Form.Check type='radio' name="state" id='asset-add-input-state-not-available'
                        value={2} defaultChecked={Number(asset.state) === 2} onClick={handleInputChange} label='Not Available'
                    />
                    <Form.Check type='radio' name="state" id='asset-add-input-state-available'
                        value={3} defaultChecked={Number(asset.state) === 3} onClick={handleInputChange} label='Waiting for recycling'
                    />
                    <Form.Check type='radio' name="state" id='asset-add-input-state-not-available'
                        value={4} defaultChecked={Number(asset.state) === 4} onClick={handleInputChange} label='Recycled'
                    />
                </Form.Group>

                <Button type='submit' variant="danger" disabled={isValidForm} style={{ marginRight: '20px' }}>Save</Button>
                <Link to={Paths.ASSETS} className="btn btn-outline-secondary px-3">Cancel</Link>
            </Form>
        </div>
    )
}
export default AssetEdit;