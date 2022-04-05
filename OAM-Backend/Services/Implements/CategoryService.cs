using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OAM_Backend.Models;
using OAM_Backend.Models.Requests;
using OAM_Backend.Models.Responses;
using OAM_Backend.Repositories;


namespace OAM_Backend.Services.Implements
{

    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public Category? Create(CategoryRequest categoryRequest)
        {
            var listCategory = _categoryRepository.ListAllCategory();
            categoryRequest.Prefix = categoryRequest.Prefix.Replace(" ", "").ToUpper();
            if (!listCategory.Any(category => category.CategoryName.ToLower().Equals(categoryRequest.CategoryName.ToLower())))
            {
                if (!listCategory.Any(category => category.Prefix.ToLower().Equals(categoryRequest.Prefix.ToLower())))
                {
                    var category = _mapper.Map<Category>(categoryRequest);
                    _categoryRepository.Create(category);
                    return category;
                }
            }
            return null;
        }

        public PagedResponse<List<Category>> GetAll(PageAction pageAction)
        {
            return _categoryRepository.GetAll(pageAction);
        }
        public Category GetCategory(int id)
        {
            return _categoryRepository.GetCategory(id);
        }

        public CategoryResponse GetCategoryById(int id)
        {
            return _mapper.Map<CategoryResponse>(_categoryRepository.GetCategoryById(id));
        }

        public List<Category> ListAllCategories()
        {
            return _categoryRepository.ListAllCategory();
        }
    }
}
