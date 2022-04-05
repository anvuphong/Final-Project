using AutoMapper;
using OAM_Backend.Constants;
using OAM_Backend.Helpers;
using OAM_Backend.Models;
using OAM_Backend.Models.Requests;
using OAM_Backend.Models.Responses;
using OAM_Backend.Repositories;
using System.Globalization;
using System.Text.RegularExpressions;

namespace OAM_Backend.Services.Implements
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IJwtUtils _jwtUtils;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public UserService(IUserRepository categoryRepository, IMapper mapper, IJwtUtils jwtUtils)
        {
            _userRepository = categoryRepository;
            _mapper = mapper;
            _jwtUtils = jwtUtils;
        }
        public PagedResponse<List<User>> GetAll(PageAction pageAction, string location, int isAdmin)
        {
            return _userRepository.GetAll(pageAction, location, isAdmin);
        }

        public User DisableUser(string staffCode)
        {
            return _userRepository.DisableUser(staffCode);
        }

        public void Create(UserCreationRequest userRequest)
        {
            var resultValidateDobAndJoinedDate = validateDobAndJoinedDate(userRequest.DOB, userRequest.JoinedDate);
            if(resultValidateDobAndJoinedDate != null)
            {
                throw new Exception(resultValidateDobAndJoinedDate);
            }

            if(userRequest.FirstName.Trim().Length > 50)
            {
                throw new Exception(Messages.FIRSTNAME_MAX_50);
            }

            if (userRequest.LastName.Trim().Length > 50)
            {
                throw new Exception(Messages.LASTNAME_MAX_50);
            }

            try
            {
                User user = _mapper.Map<User>(userRequest);

                // Generate Staffcode
                var lastestUser = _userRepository.GetLastestUser();
                if(lastestUser == null)
                {
                    user.Staffcode = "SD0001";
                }
                else
                {
                    int lastStaffCodeId = Int32.Parse(lastestUser.Staffcode.Substring(2));
                    //newStaffCodeIndexNumber = 5 => newStaffCodeIndexString = 0005
                    var newStaffCode = String.Format("{0,4:D4}", lastStaffCodeId + 1); 
                    user.Staffcode = String.Format("{0}{1}", "SD", newStaffCode);
                }

                // Generate Username
                string[] lastNameArray = userRequest.LastName.Split(' ');
                string[] firstNameArray = userRequest.FirstName.Split(' ');
                string username = "";
                foreach(string firstName in firstNameArray)
                {
                    username = String.Concat(username, firstName.ToLower());
                }
                foreach(string lastName in lastNameArray)
                {
                    username = String.Concat(username, lastName.ToLower().Substring(0, 1));
                }

                bool isExistUsername = _userRepository.IsExistUserHaveSameUsername(username);
                int indexOfUsername = 1;
                while (isExistUsername)
                {
                    isExistUsername = _userRepository
                        .IsExistUserHaveSameUsername(String.Concat(username, indexOfUsername));
                    indexOfUsername++;
                }
                if(indexOfUsername > 1)
                {
                    user.Username = String.Concat(username, indexOfUsername - 1);
                }
                else
                {
                    user.Username = username;
                }

                // Get Location of Admin creating this new account
                var adminUser = _userRepository.GetUserByStaffcode(userRequest.StaffCodeAdminAction);
                if(adminUser == null)
                {
                    throw new Exception(Messages.NOT_FOUND_ADMIN_INFO);
                }
                user.Location = adminUser.Location;

                // Generate Password
                string password = String.Concat(user.Username, "@", userRequest.DOB.ToString("ddMMyyyy"));
                user.Password = BCrypt.Net.BCrypt.HashPassword(password);

                // Set isActive = true
                user.IsActive = true;

                _userRepository.Create(user);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public User? GetUserByStaffcode(string staffCode)
        {
            return _userRepository.GetUserByStaffcode(staffCode);
        }

        public void Update(User user)
        {
            _userRepository.Update(user);
        }

        public void UpdateInformation(UserUpdateRequest userUpdateRequest)
        {
            var resultValidateDobAndJoinedDate = 
                validateDobAndJoinedDate(userUpdateRequest.DOB, userUpdateRequest.JoinedDate);
            if (resultValidateDobAndJoinedDate != null)
            {
                throw new Exception(resultValidateDobAndJoinedDate);
            }

            var userFound = _userRepository.GetUserByStaffcode(userUpdateRequest.Staffcode);
            if(userFound == null)
            {
                throw new Exception(Messages.USER_NOT_FOUND);
            }

            try
            {
                userFound.DOB = userUpdateRequest.DOB;
                userFound.JoinedDate = userUpdateRequest.JoinedDate;
                userFound.Gender = userUpdateRequest.Gender;
                userFound.IsAdmin = userUpdateRequest.IsAdmin;
                _userRepository.Update(userFound);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private string? validateDobAndJoinedDate(DateTime dob, DateTime joinedDate)
        {
            var checkAge = DateTime.Now.Year - dob.Year;
            if (checkAge < 18)
            {
                return Messages.DOB_UNDER_18_YEARS_OLD;
            }

            if (DateTime.Compare(joinedDate, dob) < 0)
            {
                return Messages.JOINED_DATE_EARLIER_DOB;
            }

            if (joinedDate.DayOfWeek == DayOfWeek.Saturday
                || joinedDate.DayOfWeek == DayOfWeek.Sunday)
            {
                return Messages.JOINED_DATE_SATURDAY_SUNDAY;
            }
            return null;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest authenticateRequest)
        {
            var userFound = _userRepository.GetUserByUsername(authenticateRequest.UserName);
            if (userFound == null)
            {
                throw new Exception(Messages.LOGIN_FAIL);
            }

            // Wrong password
            if (!BCrypt.Net.BCrypt.Verify(authenticateRequest.Password, userFound.Password))
            {
                throw new Exception(Messages.LOGIN_FAIL);
            }

            // User not active or disabled
            if (!userFound.IsActive)
            {
                throw new Exception(Messages.LOGIN_FAIL);
            }

            // authentication successful
            var response = _mapper.Map<AuthenticateResponse>(userFound);
            response.Token = _jwtUtils.GenerateToken(userFound);

            // increase log out by +1 if the user has logged in before,
            // otherwise keep it so that the user has to change the password for the first time
            if(userFound.LogCount >= 1)
            {
                userFound.LogCount++;
            }
            
            _userRepository.Update(userFound);

            return response;
        }

        public void ChangePasswordOnFirstTime(UserFirstChangePasswordRequest userFirstChangePasswordRequest)
        {
            var userFound = _userRepository.GetUserByStaffcode(userFirstChangePasswordRequest.Staffcode);
            if(userFound == null)
            {
                throw new Exception(Messages.CHANGE_PASSWORD_FAIL);
            }

            if (!IsValidPassword(userFirstChangePasswordRequest.Password))
            {
                throw new Exception(Messages.INVALID_PASSWORD);
            }

            try
            {
                userFound.LogCount++;    
                userFound.Password = BCrypt.Net.BCrypt.HashPassword(userFirstChangePasswordRequest.Password);
                _userRepository.Update(userFound);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void ChangePasswordManual(UserChangePasswordManualRequest userChangePasswordManualRequest)
        {
            var userFound = _userRepository.GetUserByStaffcode(userChangePasswordManualRequest.Staffcode);
            if (userFound == null)
            {
                throw new Exception(Messages.CHANGE_PASSWORD_FAIL);
            }
            if(!BCrypt.Net.BCrypt.Verify(userChangePasswordManualRequest.OldPassword, userFound.Password))
            {
                throw new Exception(Messages.PASSWORD_INCORRECT);
            }

            if (!IsValidPassword(userChangePasswordManualRequest.NewPassword))
            {
                throw new Exception(Messages.INVALID_PASSWORD);
            }

            try
            {
                userFound.Password = BCrypt.Net.BCrypt.HashPassword(userChangePasswordManualRequest.NewPassword);
                _userRepository.Update(userFound);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private bool IsValidPassword(string password)
        {
            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasLowerChar = new Regex(@"[A-Z]+");
            var hasMinimum8Chars = new Regex(@".{8,}");
            return hasNumber.IsMatch(password) 
                && hasUpperChar.IsMatch(password)
                && hasLowerChar.IsMatch(password)
                && hasMinimum8Chars.IsMatch(password);
        }

        public List<UserResponse> GetUsers(string location)
        {
            var userList = _userRepository.GetUsers(location);
            var userListResponse = _mapper.Map<List<UserResponse>>(userList);
            return userListResponse;
        }
    }
}
