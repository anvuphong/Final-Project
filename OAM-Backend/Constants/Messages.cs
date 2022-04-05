namespace OAM_Backend.Constants
{
    public class Messages
    {
        public const string BAD_REQUEST = "Bad request";
        public const string SERVER_ERROR = "Internal server error! Please wait in seconds and try again.";

        // User 
        public const string DOB_UNDER_18_YEARS_OLD = "User is under 18. Please select a different date";
        public const string JOINED_DATE_EARLIER_DOB = "Joined date is not later than Date of Birth. Please select a different date";
        public const string JOINED_DATE_SATURDAY_SUNDAY = "Joined date is Saturday or Sunday. Please select a different date";
        public const string CREATE_USER_SUCCESS = "Create user successfully!";
        public const string UPDATE_USER_SUCCESS = "Update user information successfully!";
        public const string USER_NOT_FOUND = "This user could not be found, please check the system again!";
        public const string NOT_FOUND_ADMIN_INFO = "Bad request! The administrator who is performing this action could not be found";
        public const string LOGIN_FAIL = "Username or password is incorrect. Please try again";
        public const string CHANGE_PASSWORD_FAIL = "System error, cannot change password, please try again later!";
        public const string INVALID_PASSWORD = "Password change failed. Password needs to have at least 1 number, 1 uppercase letter, 1 lowercase letter, and at least 8 characters";
        public const string PASSWORD_INCORRECT = "Password is incorrect";
        public const string CHANGE_PASSWORD_SUCCESS = "Your password has been changed successfully";
        public const string FIRSTNAME_MAX_50 = "First name cannot be longer than 50 characters";
        public const string LASTNAME_MAX_50 = "Last name cannot be longer than 50 characters";
    }
}
