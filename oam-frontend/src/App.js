import React, { useContext } from 'react';
import './App.css';
import ROUTES from './constants/Routes';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import { Container } from "react-bootstrap";
import Navbars from "./components/Navbars/Navbars";
import Sidebars from "./components/Sidebars/Sidebars";

const App = () => {
    const ctx = useContext(AuthContext);
    return (
        <BrowserRouter>
            {ctx.isLoggedIn && (
                <div className="main-layout">
                    <Container fluid className="mx-0 px-0">
                        <Navbars />
                        <div className="d-flex sidebar-with-content">
                            <div className="sidebar-wrapper">
                                <Sidebars />
                            </div>
                            <div className="page-content-wrapper">
                                <Routes>
                                    <Route path={ROUTES.HOME.path} element={ROUTES.HOME.element} />

                                    {/*--Users--*/}
                                    <Route path={ROUTES.USERS.path} element={ROUTES.USERS.element} />
                                    <Route path={ROUTES.USERS_CREATE.path} element={ROUTES.USERS_CREATE.element} />
                                    <Route path={ROUTES.USERS_EDIT.path} element={ROUTES.USERS_EDIT.element} />


                                    {/*--Assets--*/}
                                    <Route path={ROUTES.ASSETS.path} element={ROUTES.ASSETS.element} />
                                    <Route path={ROUTES.ASSETS_ADD.path} element={ROUTES.ASSETS_ADD.element} />
                                    <Route path={ROUTES.ASSETS_EDIT.path} element={ROUTES.ASSETS_EDIT.element} />

                                    {/*--Assignments--*/}
                                    <Route key={ROUTES.ASSIGNMENTS.path} path={ROUTES.ASSIGNMENTS.path}
                                        element={ROUTES.ASSIGNMENTS.element} />
                                    <Route path={ROUTES.ASSIGNMENTS_ADD.path} element={ROUTES.ASSIGNMENTS_ADD.element} />
                                    <Route path={ROUTES.ASSIGNMENTS_EDIT.path} element={ROUTES.ASSIGNMENTS_EDIT.element} />

                                    {/*--Request for returning--*/}
                                    <Route key={ROUTES.REQUEST_FOR_RETURNING.path}
                                        path={ROUTES.REQUEST_FOR_RETURNING.path}
                                        element={ROUTES.REQUEST_FOR_RETURNING.element} />

                                    {/*--Report--*/}
                                    <Route key={ROUTES.REPORTS.path} path={ROUTES.REPORTS.path}
                                        element={ROUTES.REPORTS.element} />

                                    <Route path="/*" element={ctx.isLoggedIn ? ROUTES.HOME.element : ROUTES.LOGIN.element} />
                                </Routes>
                            </div>
                        </div>
                    </Container>
                </div>
            )}

            {!ctx.isLoggedIn && (
                <Routes>
                    <Route path="/" element={ctx.isLoggedIn ? ROUTES.HOME.element : ROUTES.LOGIN.element} />
                    <Route path="/*" element={ctx.isLoggedIn ? ROUTES.HOME.element : ROUTES.LOGIN.element} />
                    <Route path={ROUTES.LOGIN.path} element={ROUTES.LOGIN.element} />
                </Routes>
            )}

        </BrowserRouter>
    );
}

export default App;
