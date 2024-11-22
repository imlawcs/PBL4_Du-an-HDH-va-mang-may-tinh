using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers
{
    public class CategoryManager
    {
        private readonly AppDbContext _context;

        public CategoryManager(AppDbContext context) {
            _context = context;
        }

        public bool CategoryExists(string categoryName)
        {
            return _context.Categories.Any(c => c.CategoryName == categoryName);
        }

        public async Task<(bool Succeeded, string[] Errors, Category? category)> CreateCategoryAsync(Category category)
        {
            if (CategoryExists(category.CategoryName)) return (false, new string[] { "Category name already exists" }, null);
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return (true, new string[] { }, category);
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