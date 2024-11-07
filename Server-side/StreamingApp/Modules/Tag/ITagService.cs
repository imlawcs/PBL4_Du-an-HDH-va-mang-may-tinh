using StreamingApp.Models.Entities;
using StreamingApp.Models.DTOs;

namespace StreamingApp.Services{
public interface ITagService
{
        Task<Tag?> GetTagByIdAsync(int id);
        Task<IEnumerable<Tag>> GetAllTagsAsync();
        Task<(bool Succeeded, string[] Errors)> UpdateTagAsync(int id, Tag model);
        Task<Tag> CreateTagAsync(Tag model);
        Task<bool> DeleteTagAsync(int id);
}
}
