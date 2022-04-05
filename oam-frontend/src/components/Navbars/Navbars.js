import "./Navbars.css";
import {useLocation} from "react-router-dom";
import ROUTES from "../../constants/Routes";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import {useContext, useState} from "react";
import Paths from "../../constants/Paths";
import ChangePasswordManualModal
    from "../../pages/AuthenticationPage/ChangePasswordManualModal/ChangePasswordManualModal";
import LogoutModal from "../../pages/AuthenticationPage/LogoutModal/LogoutModal";

const Navbars = () => {
    const ctx = useContext(AuthContext);
    const location = useLocation();
    const [modalChangePasswordShow, setModalChangePasswordShow] = useState(false);
    const [modalLogoutShow, setModalLogoutShow] = useState(false);

    const handleModalChangePasswordClose = () => setModalChangePasswordShow(false);
    const handleModalLogoutClose = () => setModalLogoutShow(false);

    const GetUrlName = () => {
        if (location.pathname === Paths.HOME) {
            return ROUTES.HOME.title;
        } else if (location.pathname === Paths.USERS) {
            return ROUTES.USERS.title;
        } else if (location.pathname === Paths.USERS_CREATE) {
            return `${ROUTES.USERS.title} > ${ROUTES.USERS_CREATE.title}`;
        } else if (location.pathname.includes(Paths.USERS_EDIT_PATH)) {
            return `${ROUTES.USERS.title} > ${ROUTES.USERS_EDIT.title}`;
        } else if (location.pathname === Paths.ASSETS) {
            return ROUTES.ASSETS.title;
        } else if (location.pathname === Paths.ASSETS_ADD) {
            return `${ROUTES.ASSETS.title} > ${ROUTES.ASSETS_ADD.title}`;
        } else if (location.pathname.includes(Paths.ASSETS_EDIT_PATH)) {
            return `${ROUTES.ASSETS.title} > ${ROUTES.ASSETS_EDIT.title}`;
        } else if (location.pathname === Paths.ASSIGNMENTS) {
            return ROUTES.ASSIGNMENTS.title;
        } else if (location.pathname === Paths.REQUEST_FOR_RETURNING) {
            return ROUTES.REQUEST_FOR_RETURNING.title;
        } else if (location.pathname === Paths.REPORTS) {
            return ROUTES.REPORTS.title;
        }
    }
    return (
        <>
            <Navbar className="navbar-top justify-content-between">
                <div className="d-flex">
                    <div className="">
                        <Nav.Link className="text-light" style={{paddingLeft: 0}}>
                            <span>{GetUrlName()}</span>
                        </Nav.Link>
                    </div>
                </div>
                {ctx.isLoggedIn && (
                    <NavDropdown
                        title={(<span className="text-light">{ctx.username}</span>)}
                        id="basic-nav-dropdown"
                        align="end"
                    >
                        <NavDropdown.Item onClick={() => {setModalChangePasswordShow(true)}} >
                            <a className={`text-decoration-none text-dark`}>
                                <i className="fa-solid fa-lock"/> Change password
                            </a>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setModalLogoutShow(true)}>
                            <a
                               className={`text-decoration-none text-dark`}>
                                <i className="fa-solid fa-arrow-right-from-bracket"/> Log out
                            </a>
                        </NavDropdown.Item>
                    </NavDropdown>
                )}
            </Navbar>
            <ChangePasswordManualModal
                show={modalChangePasswordShow}
                handleClose={handleModalChangePasswordClose}
            />
            <LogoutModal show={modalLogoutShow} handleClose={handleModalLogoutClose} />
        </>
    )
}

export default Navbars;