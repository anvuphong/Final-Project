import {Link, useLocation,} from "react-router-dom";

import "./Sidebars.css";
import logoPath from "./images/logo-img.png";
import Paths from "../../constants/Paths";

const Sidebars = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <img src={logoPath} alt="Logo path" className="sidebar__img-logo"/>
            <h6 className="app-name mt-2">Online Asset Management</h6>
            <div className="d-md-block sidebar__nav">
                <Link to={Paths.HOME} className={`sidebar__item ${location.pathname === Paths.HOME ? "active" : ""}`}>
                    <span className="sidebar_nav-link">
                        Home
                    </span>
                </Link>
                <Link to={Paths.USERS} className={`sidebar__item ${location.pathname.includes(Paths.USERS) ? "active" : ""}`}>
                    <span className="sidebar_nav-link">
                            Manage User
                    </span>
                </Link>
                <Link to={Paths.ASSETS}
                      className={`sidebar__item ${location.pathname.includes(Paths.ASSETS) ? "active" : ""}`}>
                    <span className="sidebar_nav-link">
                            Manage Asset
                    </span>
                </Link>
                <Link to={Paths.ASSIGNMENTS}
                      className={`sidebar__item ${location.pathname === Paths.ASSIGNMENTS ? "active" : ""}`}>
                    <span className="sidebar_nav-link">
                            Manage Assignment
                    </span>
                </Link>
                <Link to={Paths.REQUEST_FOR_RETURNING}
                      className={`sidebar__item ${location.pathname === Paths.REQUEST_FOR_RETURNING ? "active" : ""}`}>
                    <span className="sidebar_nav-link">
                            Request for Returning
                    </span>
                </Link>
                <Link to={Paths.REPORTS}
                      className={`sidebar__item ${location.pathname === Paths.REPORTS ? "active" : ""}`}>
                    <span className="sidebar_nav-link">
                        Report
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Sidebars;