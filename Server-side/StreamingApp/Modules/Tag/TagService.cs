using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;
using StreamingApp.Managers;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Data.SqlClient;

namespace StreamingApp.Services
{
    public class TagService : ITagService
    {
        private readonly TagManager TagManager;

        public TagService(TagManager tagManager)
        {
            TagManager = tagManager ?? throw new ArgumentNullException(nameof(tagManager));
        }

        public Task<(bool Succeeded, string[] Errors, Tag? tag)> CreateTagAsync(Tag model)
        {
            var tag = TagManager.CreateTag(model);
            return tag;
        }

        public Task<bool> DeleteTagAsync(int id)
        {
            return TagManager.DeleteTag(id);
        }

        public Task<IEnumerable<Tag>> GetAllTagsAsync()
        {
            return TagManager.GetListTag();
        }

        public Task<Tag?> GetTagByIdAsync(int id)
        {
            return TagManager.GetTagWithId(id);
        }

        public Task<Tag?> GetTagWithName(string name)
        {
            return TagManager.GetTagWithName(name);
        }

        public Task<(bool Succeeded, string[] Errors)> UpdateTagAsync(int id, Tag model)
        {
            return TagManager.UpdateTag(id,model);
        }
    }
}