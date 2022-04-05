import "./CreateNewUserPage.css";
import {Col, Row} from "react-bootstrap";
import Paths from "../../../constants/Paths";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ValidateDob, ValidateJoinedDateOnWeekend, ValidateJoinedDateWithDob} from "../ValidateInformations";
import axios from "axios";
import API from "../../../constants/Api";
import AuthContext from "../../../contexts/AuthContext";
import Spinners from "../../../components/Spinners/Spinners";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateNewUserPage = () => {
    const ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: false,
        joinedDate: "",
        isAdmin: null
    });
    const [errorServer, setErrorServer] = useState(null);
    const [errorDob, setErrorDob] = useState(null);
    const [errorJoinedDate, setErrorJoinedDate] = useState(null);
    const [dob, setDob] = useState("");
    const [joinedDate, setJoinedDate] = useState("");

    const handleDobChange = (date) => {
        setDob(date);
        setValues({
            ...values,
            dob: date
        });
    }
    const handleJoinedDate = (date) => {
        setJoinedDate(date);
        setValues({
            ...values,
            joinedDate: date
        });
    }


    const handleInputChange = (e) => {
        if (e.target.name === "isAdmin") {
            let valueSave = "";
            if(e.target.value === 'true'){
                valueSave = true;
            } else if(e.target.value === 'false'){
                valueSave = false;
            } else {
                valueSave = null;
            }
            setValues({
                ...values,
                isAdmin: valueSave
            })
        } else if (e.target.name === "gender") {
            setValues({
                ...values,
                gender: (e.target.value === 'true')
            })
        } else {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        }
    };

    const validateDobAndJoinedDate = () => {
        let result = true;
        setErrorDob(null);
        setErrorJoinedDate(null);
        let resultValidateDob = ValidateDob(values.dob);
        let resultValidateJoinedDateWithDob = ValidateJoinedDateWithDob(values.joinedDate, values.dob);
        let resultValidateJoinedDateOnWeekend = ValidateJoinedDateOnWeekend(values.joinedDate);
        if (resultValidateDob.length > 0) {
            setErrorDob(resultValidateDob);
            result = false;
        }
        if (resultValidateJoinedDateWithDob.length > 0) {
            setErrorJoinedDate(resultValidateJoinedDateWithDob);
            result = false;
        }

        if (resultValidateJoinedDateOnWeekend.length > 0) {
            setErrorJoinedDate(resultValidateJoinedDateOnWeekend);
            result = false;
        }
        return result;
    }

    useEffect(() => {
        let didCancel = false;
        let allInputFieldFilled =
            values.dob !== ""
            && values.dob !== null
            && values.joinedDate !== ""
            && values.joinedDate !== null
            && values.isAdmin !== null
            && values.isAdmin !== ""
            && values.firstName.trim() !== ""
            && values.lastName.trim() !== ""
        ;
        setIsDisable(!allInputFieldFilled);
        return () => {
            didCancel = true;
        };
    }, [values]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsDisable(true);
        setErrorServer(null);
        let resultValidateDobAndJoinedDate = validateDobAndJoinedDate();
        if (resultValidateDobAndJoinedDate) {
            let dobSave = new Date(values.dob);
            dobSave.setDate(values.dob.getDate() + 1);
            let joinedDateSave = new Date(values.joinedDate);
            joinedDateSave.setDate(values.joinedDate.getDate() + 1);
            axios({
                method: 'POST',
                url: API.USER_CREATE,
                data: {
                    "FirstName": values.firstName,
                    "LastName": values.lastName,
                    "DOB": dobSave,
                    "JoinedDate": joinedDateSave,
                    "Gender": values.gender,
                    "IsAdmin": values.isAdmin,
                    "StaffCodeAdminAction": ctx.staffcode
                },
                headers: {
                    "Authorization": ctx.token
                }
            }).then((response) => {
                navigate(Paths.USERS);
            }).catch((error) => {
                if (error.response.data.error) {
                    setErrorServer(error.response.data.error);
                } else if (error.message) {
                    setErrorServer(error.message);
                }
            });
        }
        setIsDisable(false);
        setIsLoading(false);
    }

    return (
        <>
            {isLoading && (<Spinners/>)}

            <div className="create-user">
                <h5 className="create-user__title mb-4">Create new User</h5>
                {errorServer && (<small className="text-danger py-2">{errorServer}</small>)}
                <form onSubmit={handleOnSubmit}>
                    <Row className="my-3">
                        <Col md={3}>First Name</Col>
                        <Col md={9}>
                            <input type="text"
                                   name="firstName"
                                   id="firstName"
                                   maxLength={50}
                                   className={`form-control`}
                                   onChange={handleInputChange}
                                   required={true}/>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md={3}>Last Name</Col>
                        <Col md={9}>
                            <input type="text"
                                   name="lastName"
                                   id="lastName"
                                   maxLength={50}
                                   className={`form-control`}
                                   onChange={handleInputChange}
                                   required={true}/>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md={3}>Date of Birth</Col>
                        <Col md={9}>
                            <DatePicker
                                name="dob"
                                selected={dob}
                                onChange={(date) => handleDobChange(date)}
                                dateFormat="dd/MM/yyyy"
                                className={`form-control ${errorDob ? "border-danger" : ""}`}
                            />
                            <i className="fa-solid fa-calendar-days create-user__icon-calendar"/>
                            {errorDob && (<small className="text-danger">{errorDob}</small>)}
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md={3}>Gender</Col>
                        <Col md={9}>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label" htmlFor="female">
                                    <input className="create-user__radio form-check-input "
                                           type="radio"
                                           name="gender"
                                           id="female"
                                           defaultChecked={true}
                                           onChange={handleInputChange}
                                           value="false"/>
                                    Female
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label" htmlFor="male">
                                    <input className="create-user__radio form-check-input"
                                           type="radio"
                                           name="gender"
                                           id="male"
                                           onChange={handleInputChange}
                                           value="true"/>
                                    Male
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md={3}>Joined Date</Col>
                        <Col md={9}>
                            <DatePicker
                                name="joinedDate"
                                selected={joinedDate}
                                onChange={(date) => handleJoinedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className={`form-control ${errorDob ? "border-danger" : ""}`}
                            />
                            <i className="fa-solid fa-calendar-days create-user__icon-calendar"/>
                            {errorJoinedDate && (<small className="text-danger">{errorJoinedDate}</small>)}
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col md={3}>Type</Col>
                        <Col md={9}>
                            <select className="form-select"
                                    aria-label="isAdmin"
                                    required
                                    name="isAdmin"
                                    onChange={handleInputChange}>
                                <option value={null} > </option>
                                <option value={true}>Admin</option>
                                <option value={false}>Staff</option>
                            </select>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-danger mx-5 px-3"
                                type="submit"
                                disabled={isDisable}
                        >Save
                        </button>
                        <Link to={Paths.USERS} className="btn btn-outline-secondary px-3">Cancel</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateNewUserPage;