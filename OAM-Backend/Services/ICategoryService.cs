using OAM_Backend.Models;
using OAM_Backend.Models.Requests;
using OAM_Backend.Models.Responses;

namespace OAM_Backend.Services
{
    public interface ICategoryService
    {
        PagedResponse<List<Category>> GetAll(PageAction pageAction);
        Category Create(CategoryRequest categoryRequest);
        CategoryResponse GetCategoryById(int id);
        Category GetCategory(int categoryId);
        List<Category> ListAllCategories();
    }
}
