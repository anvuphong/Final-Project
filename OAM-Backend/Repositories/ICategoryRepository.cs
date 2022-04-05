using OAM_Backend.Models;
using OAM_Backend.Models.Responses;

namespace OAM_Backend.Repositories
{
    public interface ICategoryRepository
    {
        PagedResponse<List<Category>> GetAll(PageAction pageAction);
        public void Create(Category category);
        public List<Category> ListAllCategory();
        public Category GetCategoryById(int id);
        Category GetCategory(int categoryId);
    }
}
