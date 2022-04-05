using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OAM_Backend.Data;
using OAM_Backend.Helpers;
using OAM_Backend.Models;
using OAM_Backend.Models.Responses;

namespace OAM_Backend.Repositories.Implements
{
    public class AssetRepository : IAssetRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public AssetRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public string GetNameByCategoryId(int id)
        {
            var category = _dbContext.Categories.FirstOrDefault(c => c.CategoryId == id);
            return category.CategoryName;
        }

        public PagedResponse<List<AssetAdminView>> GetAll(PageAction pageAction, string location, int status, int category)
        {
            var categoryList = _dbContext.Categories;
            var oldList = _dbContext.Assets.Where(x => x.Location.Trim().ToLower() == location.Trim().ToLower());
            List<AssetAdminView> adminList = new List<AssetAdminView>();
            foreach (var o in oldList)
            {
                string cateName = GetNameByCategoryId(o.CategoryId);
                adminList.Add(new AssetAdminView
                {
                    AssetCode = o.AssetCode,
                    AssetName = o.AssetName,
                    Specification = o.Specification,
                    InstalledDate = o.InstalledDate,
                    Location = o.Location,
                    Quantity = o.Quantity,
                    CategoryId = o.CategoryId,
                    CategoryName = cateName,
                    StateId = o.StateId,
                    CreatedAt = o.CreatedAt,
                    UpdatedAt = o.UpdatedAt
                });
            }
            var queryList = adminList.AsQueryable();
            IQueryable<AssetAdminView> query = queryList;
            var validAction = new PageAction(
                pageAction.PageNumber,
                pageAction.PageSize,
                pageAction.SortBy,
                pageAction.SortType,
                pageAction.SearchBy,
                pageAction.SearchValue
                );
            if (status == 1)
            {
                query = query.Where(x => x.StateId == 1);
            }
            else if (status == 2)
            {
                query = query.Where(x => x.StateId == 2);
            }
            else if (status == 3)
            {
                query = query.Where(x => x.StateId == 3);
            }
            else if (status == 4)
            {
                query = query.Where(x => x.StateId == 4);
            }
            else if (status == 5)
            {
                query = query.Where(x => x.StateId == 5);
            }
            else if (status == 6)
            {
                query = query.Where(x => x.StateId == 1 || x.StateId == 2 || x.StateId == 5);
            }
            if (category != 0)
            {
                query = query.Where(x => x.CategoryId == category);
            }
            else if (category == 0)
            {
                query = query;
            }
            // sort
            if (!string.IsNullOrEmpty(validAction.SortBy))
            {
                switch (validAction.SortBy)
                {
                    case "AssetName":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssetName);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssetName);
                        }
                        break;

                    case "AssetCode":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.AssetCode);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.AssetCode);
                        }
                        break;
                    case "Category":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.CategoryName);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.CategoryName);
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
                        query = query.OrderBy(c => c.AssetCode);
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
                query = query.Where(c => c.AssetCode.Trim().ToLower().Contains(validAction.SearchValue.Trim().ToLower()) || c.AssetName.Trim().ToLower().Contains(validAction.SearchValue.Trim().ToLower()));
            }

            var pagedData = query
               .Skip((validAction.PageNumber - 1) * validAction.PageSize)
               .Take(validAction.PageSize)
               .ToList();
            var totalRecords = query.Count();
            var pagedReponse = PageActionHelper.CreatePagedReponse<AssetAdminView>(
                pagedData,
                validAction,
                totalRecords
            );
            return pagedReponse;
        }
        public Asset? GetAsset(string code)
        {
            if (_dbContext.Assets == null) return null;
            return _dbContext.Assets.SingleOrDefault(x => x.AssetCode == code);
        }
        public void Delete(string code)
        {
            var asset = _dbContext.Assets.SingleOrDefault(x => x.AssetCode == code);
            if (asset == null) throw new InvalidDataException();
            _dbContext.Assets.Remove(asset);
            _dbContext.SaveChanges();
        }

        public void Create(Asset asset)
        {
            using var transaction = _dbContext.Database.BeginTransaction();
            try
            {
                _dbContext.Assets.Add(asset);
                _dbContext.SaveChanges();
                transaction.Commit();
            }
            catch (Exception exception)
            {
                transaction.Rollback();
                throw new Exception(exception.Message);
            }
        }

        public string GetMaxIdByCategoryId(int id)
        {
            var assetCodeWithMaxId = _dbContext.Assets.Where(asset => asset.CategoryId == id).Max(asset => asset.AssetCode);
            return assetCodeWithMaxId;
        }

        public void Update(Asset asset)
        {
            using var transaction = _dbContext.Database.BeginTransaction();
            try
            {
                _dbContext.Assets.Update(asset);
                _dbContext.SaveChanges();
                transaction.Commit();
            }
            catch (Exception exception)
            {
                transaction.Rollback();
                throw new Exception(exception.Message);
            }
        }

        public bool IsAssetExists(string assetCode)
        {
            return _dbContext.Assets.Any(a => a.AssetCode.Equals(assetCode));
        }
        public List<Asset> GetAssets()
        {
            return _dbContext.Assets.ToList();
        }
        public Asset? IsAvailableAsset(string assetCode)
        {
            return _dbContext.Assets.FirstOrDefault(a => a.AssetCode.Equals(assetCode) && a.StateId == 1);
        }

        public List<AssetResponse> GetAvailableAssets(string location)
        {
            var assets = _dbContext.Assets.Where(x => x.StateId == 1 && x.Location.Trim().ToLower() == location.Trim().ToLower());
            var categories = _dbContext.Categories;
            IQueryable<AssetResponse> join = assets.Join(categories, asset => asset.CategoryId, category => category.CategoryId, (asset, category) => new AssetResponse()
            {
                AssetCode = asset.AssetCode,
                AssetName = asset.AssetName,
                CategoryName = category.CategoryName
            });
            return join.ToList();
        }
    }
}
