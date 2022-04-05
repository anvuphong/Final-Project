import axios from "axios";
import React, {useContext, useState} from "react";
import { Button, Form, Modal } from "react-bootstrap";
import API from "../../constants/Api";
import AuthContext from "../../contexts/AuthContext";

const CategoryAddModal = (props) => {
    const ctx = useContext(AuthContext);
    const [category, setCategory] = useState({
        category: '',
        prefix: '',
    });

    const handleInputChange = (evt) => {
        setCategory({
            ...category,
            [evt.target.name]: evt.target.value
        })
    }

    const invalidCategoryName = props.categories.find(c => c.categoryName === category.category);
    const invalidCategoryPrefix = props.categories.find(c => c.prefix === category.prefix);;

    const handleSubmit = (evt) => {
        evt.preventDefault();
        (async () => {
            let isCancel = false;
            await axios({
                method: 'POST',
                url: `${API.CATEGORY}/create`,
                data: {
                    categoryName: category.category,
                    prefix: category.prefix.toUpperCase()
                },
                headers: {
                    "Authorization": ctx.token
                }
            }).then((response) => {
                props.onHide();
            }).catch((error) => {
                console.log(error);
            });
            return () => {
                isCancel = true;
            }
        })();
    }

    return (
        <Modal
            {...props}
            size='lg'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="category-add-modal-title">
                    Add new Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="add" id="category-add-modal-input-category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control name="category" type="text" onChange={handleInputChange} value={category.category} isInvalid={invalidCategoryName} />
                        <Form.Text muted hidden={invalidCategoryName}>
                            Enter Category.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            Category is already existed. Please enter a different category.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="add" id="category-add-modal-input-prefix">
                        <Form.Label>Prefix</Form.Label>
                        <Form.Control name="prefix" type="text" onChange={handleInputChange} value={category.prefix.toUpperCase()} isInvalid={invalidCategoryPrefix} />
                        <Form.Text muted hidden={invalidCategoryPrefix}>
                            Enter Prefix.
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            Prefix is already existed. Please enter a different prefix.
                        </Form.Control.Feedback>
                    </Form.Group>

                    {(category.category !== '' && category.prefix !== '' && !invalidCategoryName && !invalidCategoryPrefix) &&
                        <Button style={{ marginTop: '20px' }} variant='outline-danger' type="submit"><i class="fa-solid fa-check"></i></Button>
                    }
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default CategoryAddModal;