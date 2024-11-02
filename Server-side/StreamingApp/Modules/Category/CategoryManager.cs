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

        public async Task<Category> CreateCategoryAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return category;
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
            
            categoryToUpdate.CategoryName = category.CategoryName;
            categoryToUpdate.CategoryDesc = category.CategoryDesc;
            await _context.SaveChangesAsync();
            return (true, new string[] { });
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