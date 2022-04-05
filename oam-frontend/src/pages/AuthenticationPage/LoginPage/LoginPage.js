import logoPath from "./images/logo-img.png";
import "./LoginPage.css";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Paths from "../../../constants/Paths";
import {ToastContainer} from "react-toastify";
import AuthContext from "../../../contexts/AuthContext";
import API from "../../../constants/Api";
import Spinners from "../../../components/Spinners/Spinners";

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const authCtx = useContext(AuthContext);
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let didCancel = false;
        let allInputFieldFilled =
            values.username.trim() !== ""
            && values.password.trim() !== ""
        ;
        setIsDisable(!allInputFieldFilled);
        return () => {
            didCancel = true;
        };
    }, [values]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsDisable(true);
        axios({
            method: 'POST',
            url: API.LOGIN,
            data: values
        }).then((response) => {
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            authCtx.onLogin();
            setIsLoading(false);
            setIsDisable(false);
            setError("");
            navigate(Paths.HOME);
        }).catch((error) => {
            setIsLoading(false);
            setIsDisable(false);
            if (error.response.data.error) {
                setError(error.response.data.error);
            } else if (error.message) {
                setError(error.message);
            }
        });
    };

    return (
        <>
            {isLoading && (<Spinners/>)}

            <div className="login">
                <main className="login__form-signin">
                    <form onSubmit={handleOnSubmit}>
                        <img className="mb-4" src={logoPath} alt="" width="72"/>
                        <h1 className="h3 mb-3 fw-normal">Please Log In</h1>

                        {error.length > 0 && (
                            <div className="text-danger my-2">
                                {error}
                            </div>
                        )}

                        <div className="form-floating">
                            <input type="text"
                                   className={`form-control ${error.length > 0 ? "border-danger" : ""}`}
                                   id="username"
                                   name="username"
                                   value={values.username}
                                   onChange={handleInputChange}
                                   required={true}
                                   placeholder="Username"/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating">
                            <input type={showPassword ? "text" : "password"}
                                   className={`form-control ${error.length > 0 ? "border-danger" : ""}`}
                                   id="password"
                                   name="password"
                                   value={values.password}
                                   onChange={handleInputChange}
                                   required={true}
                                   placeholder="Password"/>
                            <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} login__icon-password`}
                               onClick={handleClickShowPassword}/>
                            <label htmlFor="password">Password</label>
                        </div>

                        <button className="w-100 btn btn-lg button-login"
                                type="submit"
                                disabled={isDisable}
                        >Log In
                        </button>
                    </form>
                </main>
                <ToastContainer/>
            </div>
        </>
    )
}

export default LoginPage;