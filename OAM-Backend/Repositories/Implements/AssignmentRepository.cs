using OAM_Backend.Data;
using OAM_Backend.Helpers;
using OAM_Backend.Models;
using OAM_Backend.Models.Responses;
using OAM_Backend.Services;
using Microsoft.EntityFrameworkCore;
using OAM_Backend.Repositories;

namespace OAM_Backend.Repositories.Implements
{
    public class AssignmentRepository : IAssignmentRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public AssignmentRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public string getAssetNameByCode(string code)
        {
            var asset = _dbContext.Assets.FirstOrDefault(x => x.AssetCode == code);
            if (asset == null)
            {
                return "";
            }
            return asset.AssetName;
        }
        public User? GetUserByStaffcode(string code)
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.Staffcode == code);
            if (user == null) { return null; }
            return user;
        }
        public PagedResponse<List<AssignmentAdminView>> GetAll(PageAction pageAction, string location, int state, string date)
        {
            var oldList = _dbContext.Assignments;
            List<AssignmentAdminView> adminList = new List<AssignmentAdminView>();
            foreach (var o in oldList)
            {
                if (getAssetNameByCode(o.AssetCode) == null ||
                   GetUserByStaffcode(o.AssignedBy) == null ||
                   GetUserByStaffcode(o.AssignedTo) == null)
                {
                    continue;
                }
                var admin = GetUserByStaffcode(o.AssignedBy);
                if (admin.Location.ToLower().Trim() == location.ToLower().Trim())
                {
                    adminList.Add(new AssignmentAdminView
                    {
                        AssignmentId = o.AssignmentId,
                        AssetCode = o.AssetCode,
                        AssetName = getAssetNameByCode(o.AssetCode),
                        AssignedToId = o.AssignedTo,
                        AssignedToName = GetUserByStaffcode(o.AssignedTo).Username,
                        AssignedById = o.AssignedBy,
                        AssignedByName = admin.Username,
                        AssignmentDate = o.AssignmentDate,
                        StateId = o.StateId,
                        Note = o.Note
                    });
                }
            }
            var queryList = adminList.AsQueryable();
            IQueryable<AssignmentAdminView> query = queryList;
            var validAction = new PageAction(
                pageAction.PageNumber,
                pageAction.PageSize,
                pageAction.SortBy,
                pageAction.SortType,
                pageAction.SearchBy,
                pageAction.SearchValue
                );
            if (state == 1)
            {
                query = query.Where(x => x.StateId == 1);
            }
            else if (state == 2)
            {
                query = query.Where(x => x.StateId == 2);
            }
            else if (state == 3)
            {
                query = query.Where(x => x.StateId == 3);
            }
            else if (state == 4)
            {
                query = query.Where(x => x.StateId == 1 || x.StateId == 2);
            }
            if (date != null)
            {
                query = query.Where(x => x.AssignmentDate.ToShortDateString() == date);
            }
            else if (date == null)
            {
                query = query;
            }

            // sort
            if (!string.IsNullOrEmpty(validAction.SortBy))
            {
                switch (validAction.SortBy)
                {
                    case "No":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssignmentId);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssignmentId);
                        }
                        break;

                    case "AssignmentCode":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssetCode);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssetCode);
                        }
                        break;

                    case "AssignmentName":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssetName);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssetName);
                        }
                        break;

                    case "AssignedTo":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssignedToName);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssignedToName);
                        }
                        break;

                    case "AssignedBy":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssignedByName);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssignedByName);
                        }
                        break;

                    case "AssignedDate":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssignmentDate);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssignmentDate);
                        }
                        break;

                    case "State":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.StateId);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.StateId);
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
                       c.AssetCode.Trim().Contains(item)
                    || c.AssetName.Trim().Contains(item)
                    || c.AssignedToName.Trim().Contains(item));
                }



            }
            var pagedData = query
               .Skip((validAction.PageNumber - 1) * validAction.PageSize)
               .Take(validAction.PageSize)
               .ToList();
            var totalRecords = query.Count();
            var pagedReponse = PageActionHelper.CreatePagedReponse<AssignmentAdminView>(
                pagedData,
                validAction,
                totalRecords
            );
            return pagedReponse;
        }
        public void Delete(int code)
        {
            var assignment = _dbContext.Assignments.SingleOrDefault(x => x.AssignmentId == code);
            if (assignment == null) throw new InvalidDataException();
            _dbContext.Assignments.Remove(assignment);
            _dbContext.SaveChanges();
        }
        public List<Assignment> GetAssignmentByStaffcode(string staffcode)
        {
            var result = _dbContext.Assignments.Where(x => x.AssignedTo == staffcode && x.StateId !=3 && x.AssignmentDate < DateTime.Now).ToList();
            return result;
        }
        public List<Assignment> GetAssignmentByAssetCode(string assetcode)
        {
            var result = _dbContext.Assignments.Where(x => x.AssetCode == assetcode).ToList();
            return result;
        }

        public PagedResponse<List<AssignmentAdminView>> GetAssigmentsByUsers(PageAction pageAction, string staffcode)
        {

            var oldList = _dbContext.Assignments.Where(x => x.AssignedTo.Trim().ToLower() == staffcode.Trim().ToLower() && x.StateId != 3 && x.AssignmentDate < DateTime.Now);
            List<AssignmentAdminView> adminList = new List<AssignmentAdminView>();
            foreach (var o in oldList)
            {
                if (getAssetNameByCode(o.AssetCode) == null ||
                   GetUserByStaffcode(o.AssignedBy) == null ||
                   GetUserByStaffcode(o.AssignedTo) == null)
                {
                    continue;
                }
                var admin = GetUserByStaffcode(o.AssignedBy);
                
                    adminList.Add(new AssignmentAdminView
                    {
                        AssignmentId = o.AssignmentId,
                        AssetCode = o.AssetCode,
                        AssetName = getAssetNameByCode(o.AssetCode),
                        AssignedToId = o.AssignedTo,
                        AssignedToName = GetUserByStaffcode(o.AssignedTo).Username,
                        AssignedById = o.AssignedBy,
                        AssignedByName = admin.Username,
                        AssignmentDate = o.AssignmentDate,
                        StateId = o.StateId,
                        Note = o.Note
                    });
            }
            var queryList = adminList.AsQueryable();
            IQueryable<AssignmentAdminView> query = queryList;
            var validAction = new PageAction(
                pageAction.PageNumber,
                pageAction.PageSize,
                pageAction.SortBy,
                pageAction.SortType,
                pageAction.SearchBy,
                pageAction.SearchValue
                );

            // sort
            if (!string.IsNullOrEmpty(validAction.SortBy))
            {
                switch (validAction.SortBy)
                {
                    case "No":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.UpdatedAt);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.UpdatedAt);
                        }
                        break;

                    case "AssignmentCode":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssetCode);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssetCode);
                        }
                        break;

                    case "AssignmentName":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssetName);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssetName);
                        }
                        break;

                    case "AssignedTo":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssignedToName);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssignedToName);
                        }
                        break;

                    case "AssignedBy":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssignedByName);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssignedByName);
                        }
                        break;

                    case "AssignedDate":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssignedByName);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssignedByName);
                        }
                        break;

                    case "State":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.StateId);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.StateId);
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

            var pagedData = query
               .Skip((validAction.PageNumber - 1) * validAction.PageSize)
               .Take(validAction.PageSize)
               .ToList();
            var totalRecords = query.Count();
            var pagedReponse = PageActionHelper.CreatePagedReponse<AssignmentAdminView>(
                pagedData,
                validAction,
                totalRecords
            );
            return pagedReponse;
        }
        public void Create(Assignment assignment)
        {
            using var transaction = _dbContext.Database.BeginTransaction();
            try
            {
                _dbContext.Assignments.Add(assignment);
                _dbContext.SaveChanges();
                transaction.Commit();
            }
            catch (Exception exception)
            {
                transaction.Rollback();
                throw new Exception(exception.Message);
            }
        }

        public void Update(Assignment assignment)
        {
            using var transaction = _dbContext.Database.BeginTransaction();
            try
            {
                _dbContext.Assignments.Update(assignment);
                _dbContext.SaveChanges();
                transaction.Commit();
            }
            catch (Exception exception)
            {
                transaction.Rollback();
                throw new Exception(exception.Message);
            }
        }

        public Assignment? GetAssignmentById(int assignmentId)
        {
            return _dbContext.Assignments.Find(assignmentId);
        }
        public Assignment DeclineAssignment(int assignmentId)
        {
            var res = _dbContext.Assignments.FirstOrDefault(x => x.AssignmentId == assignmentId);
            if (res != null)
            {
                res.StateId = 3;
                _dbContext.SaveChanges();
            }
            return res;
        }
        public Assignment AcceptAssignment(int assignmentId)
        {
            var res = _dbContext.Assignments.FirstOrDefault(x => x.AssignmentId == assignmentId);
            if (res != null)
            {
                res.StateId = 2;
                _dbContext.SaveChanges();
            }
            return res;
        }
    }
}
