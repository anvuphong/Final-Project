const Paths = {
    // Authentications
    AUTHENTICATION: "/authentication",
    LOGIN: "/login",

    // Home
    HOME: "/",

    // Category
    CATEGORY: "/category/list",
    CATEGORY_ADD: "/category/add",
    CATEGORY_EDIT: "/category/edit/:id",

    // Users
    USERS: "/users",
    USERS_CREATE: "/users/create",
    USERS_EDIT: "/users/edit/:staffCode",
    USERS_EDIT_PATH: "/users/edit",

    // Assets
    ASSETS: "/assets",
    ASSETS_ADD: "/assets/add",
    ASSETS_EDIT: "/assets/edit/:assetCode",
    ASSETS_EDIT_PATH: "/assets/edit",

    // Assignments
    ASSIGNMENTS: "/assignments",
    ASSIGNMENTS_ADD: "/assignments/add",
    ASSIGNMENTS_EDIT: "/assignments/edit/:assignmentId",
    ASSIGNMENTS_EDIT_PATH: "/assignments/edit",

    // Request for returning
    REQUEST_FOR_RETURNING: "/request-for-returning",

    // Reports
    REPORTS: "/reports"
}

export default Paths;