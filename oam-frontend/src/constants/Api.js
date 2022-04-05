// const BACKEND_API_URL = "https://rookiesgroup1.azurewebsites.net/";
const BACKEND_API_URL = "https://localhost:5000/"; // For develop

const API = {
    // Categories
    CATEGORY: `${BACKEND_API_URL}api/categories`,
    CATEGORY_LIST: `${BACKEND_API_URL}api/categories/list`,
    CATEGORY_FILTER: `${BACKEND_API_URL}api/categories/list/page-response`,

    // Users
    USER: `${BACKEND_API_URL}api/users`,
    USER_LIST: `${BACKEND_API_URL}api/users/list`,
    USER_LIST_RAWDATA: `${BACKEND_API_URL}api/users/getusers`,
    CHECK_USER: `${BACKEND_API_URL}api/users/check-valid-disable`,
    DISABLE_USER: `${BACKEND_API_URL}api/users/disable`,
    USER_CREATE: `${BACKEND_API_URL}api/users/create`,
    USER_EDIT: `${BACKEND_API_URL}api/users/edit`,
    USER_DETAIL: `${BACKEND_API_URL}api/users/detail`,

    // Assets
    ASSET: `${BACKEND_API_URL}api/assets`,
    ASSET_CREATE: `${BACKEND_API_URL}api/assets/create`,
    ASSET_EDIT: `${BACKEND_API_URL}api/assets/edit`,
    ASSET_LIST: `${BACKEND_API_URL}api/assets/list`,
    ASSET_DETAIL: `${BACKEND_API_URL}api/assets/detail`,
    ASSET_DELETE: `${BACKEND_API_URL}api/assets/delete`,
    CHECK_ASSET: `${BACKEND_API_URL}api/assets/CheckValidDeleteAsset`,
    ASSET_GETALL: `${BACKEND_API_URL}api/assets/get-assets`,
    ASSET_GETALL_AVAILABLE: `${BACKEND_API_URL}api/assets/get-assets-available`,

    // Assignment
    ASSIGNMENT: `${BACKEND_API_URL}api/assignments`,
    ASSIGNMENT_LIST: `${BACKEND_API_URL}api/assignments/list`,
    ASSIGNMENT_CREATE: `${BACKEND_API_URL}api/assignments/create`,
    ASSIGNMENT_EDIT: `${BACKEND_API_URL}api/assignments/edit`,
    ASSIGNMENT_DELETE: `${BACKEND_API_URL}api/assignments/delete`,
    ASSIGNMENT_DETAIL: `${BACKEND_API_URL}api/assignments/detail`,

    // Authentications
    LOGIN: `${BACKEND_API_URL}api/authentications/login`,
    CHANGE_PASSWORD_FIRST: `${BACKEND_API_URL}api/authentications/password/first`,
    CHANGE_PASSWORD_MANUAL: `${BACKEND_API_URL}api/authentications/password/manual`,
    //Assignments
    ASSIGNMENT_USER: `${BACKEND_API_URL}api/assignments/list/user`,
    ASSIGNMENT_ASSET_INFO:`${BACKEND_API_URL}api/assets/get-assets`,
    ASSIGNMENT_USER_INFO:`${BACKEND_API_URL}api/users/getusers`,
    ASSIGNMENT_ACCEPT: `${BACKEND_API_URL}api/assignments/accept-assignment`,
    ASSIGNMENT_DECLINE: `${BACKEND_API_URL}api/assignments/decline-assignment`
}
export default API;