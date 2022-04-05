import "./ChangePasswordManualModal.css";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../contexts/AuthContext";
import axios from "axios";
import API from "../../../constants/Api";
import Spinners from "../../../components/Spinners/Spinners";
import {Col, Modal, Row} from "react-bootstrap";

const ChangePasswordManualModal = props => {
    const ctx = useContext(AuthContext);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [values, setValues] = useState({
        oldPassword: null,
        newPassword: null,
        confirmation: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(true);
    const [error, setError] = useState("");
    const [errorOldPassword, setErrorOldPassword] = useState("");
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
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

    useEffect(() => {
        let didCancel = false;
        let allInputFieldFilled =
            values.oldPassword !== ""
            && values.oldPassword !== null
            && values.newPassword !== ""
            && values.newPassword !== null
            && values.confirmation !== ""
            && values.confirmation !== null;
        setIsDisable(!allInputFieldFilled);
        return () => {
            didCancel = true;
        };
    }, [values]);


    const handleSubmit = () => {
        if (values.newPassword !== values.confirmation) {
            setError("Password and confirmation is not match!");
        } else {
            setError("");
            setIsLoading(true);
            setIsDisable(true);
            axios({
                method: 'POST',
                url: API.CHANGE_PASSWORD_MANUAL,
                data: {
                    Staffcode: ctx.staffcode,
                    OldPassword: values.oldPassword,
                    NewPassword: values.newPassword
                },
                headers: {
                    "Authorization": ctx.token
                }
            }).then((response) => {
                setIsDisable(false);
                setError("");
                setChangePasswordSuccess(true);
            }).catch((error) => {
                setIsDisable(false);
                if (error.response.data.error) {
                    if (error.response.data.error === "Password is incorrect") {
                        setErrorOldPassword(error.response.data.error);
                    } else {
                        setError(error.response.data.error);
                    }
                } else if (error.message) {
                    if (error.message === "Password is incorrect") {
                        setErrorOldPassword(error.message);
                    } else {
                        setError(error.message);
                    }
                }
            });
            setIsLoading(false);
        }
    }

    const handleCloseModal = () => {
        setError("");
        setErrorOldPassword("");
        props.handleClose();
        setChangePasswordSuccess(false);
    }

    return (
        <>


            <Modal show={props.show} className="cpm-modal">
                {isLoading && (<Spinners/>)}
                <Modal.Header className="cpm-modal__header">
                    <Modal.Title>
                        <span className="text-danger bold">Change password</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {changePasswordSuccess && (
                        <p>Your password has been changed successfully</p>
                    )}
                    {!changePasswordSuccess && (
                        <>
                            <Row className="mt-3">
                                <Col md={4}>Old password</Col>
                                <Col md={8}>
                                    <input type={showOldPassword ? "text" : "password"}
                                           name="oldPassword"
                                           id="oldPassword"
                                           className="form-control"
                                           required={true}
                                           onChange={handleInputChange}
                                    />
                                    <i className={`fa-solid ${showOldPassword
                                        ? "fa-eye"
                                        : "fa-eye-slash"} cpm-modal__icon-old-password`}
                                       onClick={handleClickShowOldPassword}/>
                                    {errorOldPassword !== "" && (<small className="text-danger text-center">{errorOldPassword}</small> )}
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col md={4}>New password</Col>
                                <Col md={8}>
                                    <input type={showNewPassword ? "text" : "password"}
                                           name="newPassword"
                                           id="newPassword"
                                           className="form-control"
                                           required={true}
                                           onChange={handleInputChange}
                                    />
                                    <i className={`fa-solid ${showNewPassword ? "fa-eye" : "fa-eye-slash"} cpm-modal__icon-password`}
                                       onClick={handleClickShowNewPassword}/>
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
                                    <i className={`fa-solid ${showConfirmation ? "fa-eye" : "fa-eye-slash"} cpm-modal__icon-confirmation`}
                                       onClick={handleClickShowConfirmation}/>
                                </Col>
                            </Row>
                            {error.length > 0 && (
                                <div className="text-danger my-2 text-center">
                                    {error}
                                </div>
                            )}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {!changePasswordSuccess && (
                    <button className="btn btn-danger px-3" onClick={handleSubmit} disabled={isDisable}>
                        Save
                    </button>)}

                    <button className="btn btn-outline-secondary px-3 ms-4" onClick={handleCloseModal}>
                        {!changePasswordSuccess ? "Cancel" : "Close"}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ChangePasswordManualModal;