using StreamingApp.Models.Entities;
using StreamingApp.Models.DTOs;

namespace StreamingApp.Services
{
    public interface IStreamTagService
    {
        Task<(bool Succeeded, string[] Errors, IEnumerable<StreamTag> StreamCategories)> GetListStreamTagByIdAsync(int StreamId);
        Task<StreamTag?> GetStreamTagByIdAsync(int StreamId, int CategoryId);
        Task<IEnumerable<StreamTag>> GetAllStreamTagsAsync();
        Task<bool> DeleteStreamTagAsync(int streamId, int categoryId);
        Task<bool> DeleteListStreamTagAsync(int streamId);
        Task<(bool Succeeded, string[] Errors)> CreateStreamTagAsync(StreamTag StreamTag);
        Task<(bool Succeeded, string[] Errors)> UpdateStreamTagAsync(int StreamId, int TagId, StreamTag StreamTag);
    }
}