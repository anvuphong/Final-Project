import React  from 'react';
import AssetAdd from '../pages/AssetPage/AssetAdd';
import Paths from "./Paths";
import AssetPage from '../pages/AssetPage/AssetPage/AssetPage'
import MainLayout from "../layouts/MainLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import HomePage from "../pages/HomePage/HomePage";
import ReportPage from "../pages/ReportPage/ReportPage";
import LoginPage from "../pages/AuthenticationPage/LoginPage/LoginPage";
import UserPage from '../pages/UserPage/userpage';
import RequestForReturningPage from "../pages/RequestForReturningPage/RequestForReturningPage";
import AssignmentPage from '../pages/AssignmentPage/AssignmentPage/AssignmentPage';
import CreateNewUserPage from "../pages/UserPage/CreateNewUserPage/CreateNewUserPage";
import EditUserPage from "../pages/UserPage/EditUserPage/EditUserPage";
import AssetEdit from '../pages/AssetPage/AssetEdit';
import AssignmentAdd from '../pages/AssignmentPage/AssignmentAdd/AssignmentAdd';
import AssignmentEdit from '../pages/AssignmentPage/AssignmentEdit/AssignmentEdit';

const ROUTES = {
    // Authentications
    AUTHENTICATION: {
        path: Paths.AUTHENTICATION,
        title: "Authentication",
        element: <PrivateLayout />,
    },
    LOGIN: {
        path: Paths.AUTHENTICATION,
        title: "LoginPage",
        element: <LoginPage />,
    },

    // Home
    MAIN: {
        path: Paths.HOME,
        title: "Main",
        element: <MainLayout />,
    },
    HOME: {
        path: Paths.HOME,
        title: "Home",
        element: <HomePage />,
    },

    // Users
    USERS: {
        path: Paths.USERS,
        title: "Manage Users",
        element: <UserPage/>
    },
    USERS_CREATE: {
        path: Paths.USERS_CREATE,
        title: "Create new User",
        element: <CreateNewUserPage/>
    },
    USERS_EDIT: {
        path: Paths.USERS_EDIT,
        title: "Edit User",
        element: <EditUserPage />
    },

    // Assets
    ASSETS: {
        path: Paths.ASSETS,
        title: "Manage Assets",
        element: <AssetPage />,
    },
    ASSETS_ADD: {
        path: Paths.ASSETS_ADD,
        title: "Add New Asset",
        element: <AssetAdd />
    },
    ASSETS_EDIT: {
        path: Paths.ASSETS_EDIT,
        title: "Edit Asset",
        element: <AssetEdit/>
    },

    // Assignments
    ASSIGNMENTS: {
        path: Paths.ASSIGNMENTS,
        title: "Manage Assignment",
        element: <AssignmentPage />
    },
    ASSIGNMENTS_ADD: {
        path: Paths.ASSIGNMENTS_ADD,
        title: "Add New Assignment",
        element: <AssignmentAdd />
    },
    ASSIGNMENTS_EDIT: {
        path: Paths.ASSIGNMENTS_EDIT,
        title: "Edit Assignment",
        element: <AssignmentEdit />
    },

    // Request for returning
    REQUEST_FOR_RETURNING: {
        path: Paths.REQUEST_FOR_RETURNING,
        title: "Request for Returning",
        element: <RequestForReturningPage />
    },

    // Reports
    REPORTS: {
        path: Paths.REPORTS,
        title: "Manage Reports",
        element: <ReportPage />,
    }
}

export default ROUTES;