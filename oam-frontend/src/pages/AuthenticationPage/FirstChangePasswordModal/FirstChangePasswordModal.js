import {Col, Modal, Row} from "react-bootstrap";
import "./FirstChangePasswordModal.css";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import API from "../../../constants/Api";
import Spinners from "../../../components/Spinners/Spinners";
import AuthContext from "../../../contexts/AuthContext";

const FirstChangePasswordModal = (props) => {
    const ctx = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [values, setValues] = useState({
        password: "",
        confirmation: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let didCancel = false;
        let allInputFieldFilled =
            values.password.trim() !== ""
            && values.confirmation.trim() !== ""
        ;
        setIsDisable(!allInputFieldFilled);
        return () => {
            didCancel = true;
        };
    }, [values]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        if(values.password !== values.confirmation){
            setError("Password and confirmation is not match!");
        } else {
            setIsLoading(true);
            setIsDisable(true);
            axios({
                method: 'POST',
                url: API.CHANGE_PASSWORD_FIRST,
                data: {
                    Staffcode: ctx.staffcode,
                    password: values.password
                },
                headers: {
                    "Authorization": ctx.token
                }
            }).then((response) => {
                ctx.onLogCountIncrease();
                setIsLoading(false);
                setIsDisable(false);
                setError("");
                props.handleClose();
            }).catch((error) => {
                setIsLoading(false);
                setIsDisable(false);
                if (error.response.data.error) {
                    setError(error.response.data.error);
                } else if (error.message) {
                    setError(error.message);
                }
            });
        }
    }

    return (
        <>
            {isLoading && (<Spinners/>)}

            <Modal show={props.show} className="fcp-modal">
                <Modal.Header className="fcp-modal__header">
                    <Modal.Title>
                        <span className="text-danger bold">Change password</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="fcp-modal__content">This is the first time you logged in.</p>
                    <p className="fcp-modal__content">You have to change your password to continue.</p>

                    <Row className="mt-3">
                        <Col md={4}>New password</Col>
                        <Col md={8}>
                            <input type={showPassword ? "text" : "password"}
                                   name="password"
                                   id="password"
                                   className="form-control"
                                   required={true}
                                   onChange={handleInputChange}
                            />
                            <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} fcp-modal__icon-password`}
                               onClick={handleClickShowPassword}/>
                        </Col>
                    </Row>
                    <Row className="my-2">
                        <Col md={4}>Confirmation</Col>
                        <Col md={8}>
                            <input type={showConfirmation ? "text" : "password"}
                                   name="confirmation"
                                   id="confirmation"
                                   className="form-control"
                                   required={true}
                                   onChange={handleInputChange}
                            />
                            <i className={`fa-solid ${showConfirmation ? "fa-eye" : "fa-eye-slash"} fcp-modal__icon-confirmation`}
                               onClick={handleClickShowConfirmation}/>
                        </Col>
                    </Row>
                    {error.length > 0 && (
                        <div className="text-danger my-2">
                            {error}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={handleSubmit} disabled={isDisable}>
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default FirstChangePasswordModal;