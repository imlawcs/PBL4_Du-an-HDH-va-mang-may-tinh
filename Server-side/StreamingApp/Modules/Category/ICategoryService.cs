using StreamingApp.Models.Entities;
using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;

namespace StreamingApp.Services{
public interface ICategoryService
{
    Task<Category> GetCategoryByIdAsync(int id);
    Task<IEnumerable<Category>> GetAllCategoryAsync();
    Task<(bool Succeeded, string[] Errors)> UpdateCategoryAsync(int id,Category model);
    Task<bool> DeleteCategoryAsync(int id);
    Task<Category> CreateCategoryAsync(Category model);
}
}