using OAM_Backend.Models;
using OAM_Backend.Models.Responses;

namespace OAM_Backend.Repositories
{
    public interface IUserRepository
    {
        PagedResponse<List<User>> GetAll(PageAction pageAction, string location, int isAdmin);
        User DisableUser(string staffcode);
        void Create(User user); 
        void Update(User user);
        User? GetUserByStaffcode(string staffCode);
        User? GetUserByUsername(string username);
        User? GetLastestUser();
        List<User> GetUsers(string location);
        bool IsExistUserHaveSameUsername(string username);
    }
}
