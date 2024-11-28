using StreamingApp.Models.Entities;
using StreamingApp.Models.DTOs;

namespace StreamingApp.Services{
public interface ITagService
{
        Task<Tag?> GetTagByIdAsync(int id);
        Task<Tag?> GetTagWithName(string name);
        Task<IEnumerable<Tag>> GetAllTagsAsync();
        Task<(bool Succeeded, string[] Errors)> UpdateTagAsync(int id, Tag model);
        Task<(bool Succeeded, string[] Errors, Tag? tag)> CreateTagAsync(Tag model);
        Task<bool> DeleteTagAsync(int id);
}
}
