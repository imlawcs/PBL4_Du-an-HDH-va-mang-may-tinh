using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;
using StreamingApp.Services;

namespace StreamingApp.Managers
{
    public class CategoryManager
    {
        private readonly AppDbContext _context;
        private readonly IFileService _fileService;

        public CategoryManager(AppDbContext context, IFileService fileService) {
            _context = context;
            _fileService = fileService;
        }

        private bool IsValidImage(IFormFile file)
        {
            if (file.Length > 5 * 1024 * 1024) // 5MB limit
                return false;

            var allowedTypes = new[] { "image/jpeg", "image/jpg", "image/png", "image/gif" };
            return allowedTypes.Contains(file.ContentType.ToLower());
        }

        public bool CategoryExists(string categoryName)
        {
            return _context.Categories.Any(c => c.CategoryName == categoryName);
        }

        public async Task<(bool Succeeded, string[] Errors, Category? category)> CreateCategoryAsync(CategoryDTO category)
        {
            if (CategoryExists(category.CategoryName)) return (false, new string[] { "Category name already exists" }, null);
            
            var categoryNew = new Category
            {
                CategoryName = category.CategoryName,
                CategoryDesc = category.CategoryDesc
            };
            
            if(category.ImagePath != null)
            {
                if (!IsValidImage(category.ImagePath))
                return (false, new[] { "Invalid image format" }, null);

                try
                {
                    categoryNew.ImagePath = await _fileService.SaveFileAsync(category.ImagePath);
                }
                catch (Exception)
                {
                    return (false, new[] { "Error uploading image" }, null);
                }
            }
            _context.Categories.Add(categoryNew);
            await _context.SaveChangesAsync();
            return (true, new string[] { }, categoryNew);
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetCategoryByIdAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return null;
            return category;
        }

        public async Task<(bool Succeeded, string[] Errors)>UpdateCategoryAsync(int id, Category category)
        {
            var categoryToUpdate = await _context.Categories.FindAsync(id);
            if (categoryToUpdate == null) return (false, new string[] { "Category not found" });
            
            if(CategoryExists(category.CategoryName))
            {
                return (false, new string[] { "Category name already exists" });
            }

            categoryToUpdate.CategoryName = category.CategoryName;
            categoryToUpdate.CategoryDesc = category.CategoryDesc;
            await _context.SaveChangesAsync();
            return (true, new string[] {"Update category successfully"});
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return false;
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}