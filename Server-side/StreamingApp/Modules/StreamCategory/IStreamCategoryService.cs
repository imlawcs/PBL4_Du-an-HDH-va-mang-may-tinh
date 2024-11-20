using StreamingApp.Models.Entities;
using StreamingApp.Models.DTOs;

namespace StreamingApp.Services
{
    public interface IStreamCategoryService
    {
        Task<(bool Succeeded, string[] Errors, IEnumerable<StreamCategory> StreamCategories)> GetListStreamCategoryByIdAsync(int StreamId);
        Task<StreamCategory?> GetStreamCategoryByIdAsync(int StreamId, int CategoryId);
        Task<IEnumerable<StreamCategory>> GetAllStreamCategorysAsync();
        Task<bool> DeleteStreamCategoryAsync(int streamId, int categoryId);
        Task<bool> DeleteListStreamCategoryAsync(int streamId);
        Task<(bool Succeeded, string[] Errors)> CreateStreamCategoryAsync(StreamCategory StreamCategory);
        Task<(bool Succeeded, string[] Errors)> UpdateStreamCategoryAsync(int StreamId, int CategoryId, StreamCategory StreamCategory);
    }
}