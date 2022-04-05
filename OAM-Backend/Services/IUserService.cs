using OAM_Backend.Models;
using OAM_Backend.Models.Requests;
using OAM_Backend.Models.Responses;


namespace OAM_Backend.Services
{
    public interface IUserService
    {
        PagedResponse<List<User>> GetAll(PageAction pageAction, string location, int isAdmin);
        List<UserResponse> GetUsers(string location);
        User DisableUser(string staffCode);
        void Create(UserCreationRequest userCreationRequest);
        void UpdateInformation(UserUpdateRequest userUpdateRequest);
        void Update(User user);
        User? GetUserByStaffcode(string staffCode);
        AuthenticateResponse Authenticate(AuthenticateRequest modelRequest);
        void ChangePasswordOnFirstTime(UserFirstChangePasswordRequest userFirstChangePasswordRequest);
        void ChangePasswordManual(UserChangePasswordManualRequest userChangePasswordManual);
    }
}
