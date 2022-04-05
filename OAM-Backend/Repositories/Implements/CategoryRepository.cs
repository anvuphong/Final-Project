using OAM_Backend.Data;
using OAM_Backend.Helpers;
using OAM_Backend.Models;
using OAM_Backend.Models.Responses;
using OAM_Backend.Services;
using Microsoft.EntityFrameworkCore;

namespace OAM_Backend.Repositories.Implements
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public CategoryRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Create(Category category)
        {
            _dbContext.Categories.Add(category);
            _dbContext.SaveChanges();
        }

        public List<Category> ListAllCategory()
        {
            return _dbContext.Categories.ToList();
        }

        public PagedResponse<List<Category>> GetAll(PageAction pageAction)
        {
            IQueryable<Category> query = _dbContext.Categories;
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
                    case "CategoryName":
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.CategoryName);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.CategoryName);
                        }

                        break;
                    default:
                        if (validAction.SortType == "asc")
                        {
                            query = query.OrderBy(c => c.CategoryId);
                        }
                        else
                        {
                            query = query.OrderByDescending(c => c.CategoryId);
                        }

                        break;
                }
            }
            else
            {
                query = query.OrderBy(c => c.CategoryId);
            }


            // search
            if (!string.IsNullOrEmpty(validAction.SearchValue))
            {

                query = query.Where(c => c.CategoryName.Contains(validAction.SearchValue));
            }

            var pagedData = query
               .Skip((validAction.PageNumber - 1) * validAction.PageSize)
               .Take(validAction.PageSize)
               .ToList();
            var totalRecords = query.Count();
            var pagedReponse = PageActionHelper.CreatePagedReponse<Category>(
                pagedData,
                validAction,
                totalRecords
            );
            return pagedReponse;
        }

        public Category GetCategoryById(int id)
        {
            return _dbContext.Categories.Find(id);
        }

        public Category GetCategory(int categoryId)
        {
            if (_dbContext.Categories == null) return null;
            return _dbContext.Categories.SingleOrDefault(x => x.CategoryId == categoryId);
        }
    }
}
