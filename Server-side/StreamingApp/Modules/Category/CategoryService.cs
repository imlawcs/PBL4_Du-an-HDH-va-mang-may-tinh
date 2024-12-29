using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;
using StreamingApp.Managers;

namespace StreamingApp.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly CategoryManager CategoryManager;

        public CategoryService(CategoryManager categoryManager)
        {
            CategoryManager = categoryManager ?? throw new ArgumentNullException(nameof(categoryManager));
        }
        public Task<(bool Succeeded, string[] Errors, Category? category)> CreateCategoryAsync(CategoryDTO model)
        {
            return CategoryManager.CreateCategoryAsync(model);
        }

        public Task<bool> DeleteCategoryAsync(int id)
        {
            return CategoryManager.DeleteCategoryAsync(id);
        }

        public Task<IEnumerable<Category>> GetAllCategoryAsync()
        {
            return CategoryManager.GetCategoriesAsync();
        }

        public Task<Category> GetCategoryByIdAsync(int id)
        {
            return CategoryManager.GetCategoryByIdAsync(id);
        }

        public Task<(bool Succeeded, string[] Errors)> UpdateCategoryAsync(int id,Category model)
        {
            return CategoryManager.UpdateCategoryAsync(id,model);
        }
    }
}