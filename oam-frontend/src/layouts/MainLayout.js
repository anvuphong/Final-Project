import Navbars from "../components/Navbars/Navbars";
import Sidebars from "../components/Sidebars/Sidebars";
import "./MainLayout.css";
import {Col, Container, Row} from "react-bootstrap";
import {Outlet, Route, Routes} from "react-router-dom";
import ROUTES from "../constants/Routes";

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Container fluid className="mx-0 px-0">
                <Navbars />
                <div className="d-flex sidebar-with-content">
                    <div className="sidebar-wrapper">
                        <Sidebars />
                    </div>
                    <div className="page-content-wrapper">
                        <Outlet />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MainLayout;