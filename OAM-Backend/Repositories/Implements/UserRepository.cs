using OAM_Backend.Data;
using OAM_Backend.Helpers;
using OAM_Backend.Models;
using OAM_Backend.Models.Responses;

namespace OAM_Backend.Repositories.Implements
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public PagedResponse<List<User>> GetAll(PageAction pageAction, string location, int isAdmin)
        {

            IQueryable<User> query = _dbContext.Users.Where(x => x.IsActive == true && x.Location.Trim().ToLower() == location.Trim().ToLower());
            var validAction = new PageAction(
                pageAction.PageNumber,
                pageAction.PageSize,
                pageAction.SortBy,
                pageAction.SortType,
                pageAction.SearchBy,
                pageAction.SearchValue
                );
            if (isAdmin == 1)
            {
                query = query.Where(x => x.IsAdmin == true);
            }
            else if (isAdmin == 0)
            {
                query = query.Where(x => x.IsAdmin == false);
            }
            else if (isAdmin == 2)
            {
                query = query.Where(x => x.IsActive == true);
            }

            // sort
            if (!string.IsNullOrEmpty(validAction.SortBy))
            {
                switch (validAction.SortBy)
                {
                    case "LastName":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.LastName);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.LastName);
                        }

                        break;
                    case "StaffCode":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.Staffcode);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.Staffcode);
                        }

                        break;
                    case "UserName":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.Username);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.Username);
                        }
                        break;
                    case "JoinedDate":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.JoinedDate);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.JoinedDate);
                        }
                        break;
                    case "Type":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.IsAdmin);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.IsAdmin);
                        }
                        break;
                    default:
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderByDescending(c => c.UpdatedAt);
                        }
                        else
                        {
                            query = query.OrderBy(c => c.UpdatedAt);
                        }

                        break;
                }
            }
            else
            {
                query = query.OrderByDescending(c => c.UpdatedAt);
            }


            // search
            if (!string.IsNullOrEmpty(validAction.SearchValue))
            {
                string[] searchValue = validAction.SearchValue.Trim().Split(' ');
                foreach (var item in searchValue)
                {
                    query = query.Where(c =>
                       c.FirstName.Trim().Contains(item)
                    || c.LastName.Trim().Contains(item)
                    || c.Staffcode.Trim().Contains(item)
                    || c.Username.Trim().Contains(item));
                }
            }

            var pagedData = query
               .Skip((validAction.PageNumber - 1) * validAction.PageSize)
               .Take(validAction.PageSize)
               .ToList();
            var totalRecords = query.Count();
            var pagedReponse = PageActionHelper.CreatePagedReponse<User>(
                pagedData,
                validAction,
                totalRecords
            );
            return pagedReponse;
        }

        public User DisableUser(string staffCode)
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.Staffcode == staffCode);
            if (user != null)
            {
                user.IsActive = false;
                _dbContext.SaveChanges();
            }
            return user;
        }

        public List<User> GetUsers(string location)
        {
            return _dbContext.Users.Where(x => x.IsActive == true && x.Location.Trim().ToLower() == location.Trim().ToLower()).ToList();
        }
        public void Create(User user)
        {
            using var transaction = _dbContext.Database.BeginTransaction();
            try
            {
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
                transaction.Commit();
            }
            catch (Exception exception)
            {
                transaction.Rollback();
                throw new Exception(exception.Message);
            }
        }

        public User? GetUserByStaffcode(string staffCode)
        {
            return _dbContext.Users.FirstOrDefault(x => x.Staffcode.Trim().ToLower() == staffCode.Trim().ToLower());
        }

        public void Update(User user)
        {
            using var transaction = _dbContext.Database.BeginTransaction();
            try
            {
                _dbContext.Users.Update(user);
                _dbContext.SaveChanges();
                transaction.Commit();
            }
            catch (Exception exception)
            {
                transaction.Rollback();
                throw new Exception(exception.Message);
            }
        }

        public User? GetLastestUser()
        {
            return _dbContext.Users.OrderBy(x => x.Id).LastOrDefault();
        }

        public bool IsExistUserHaveSameUsername(string username)
        {
            return _dbContext.Users.Any(x => x.Username.Trim().ToLower() == username.Trim().ToLower());
        }

        public User? GetUserByUsername(string username)
        {
            return _dbContext.Users.FirstOrDefault(x => x.Username.Trim().ToLower() == username.Trim().ToLower());
        }
    }
}
