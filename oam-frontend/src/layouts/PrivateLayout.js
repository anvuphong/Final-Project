import {Outlet} from "react-router-dom";

const PrivateLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default PrivateLayout;