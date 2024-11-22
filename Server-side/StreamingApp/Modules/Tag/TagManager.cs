using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers{
    public class TagManager{
        private readonly AppDbContext _context;

        public TagManager(AppDbContext context) {
            _context = context;
        }

        public bool TagExits(string tagName){
            return _context.Tags.Any(tag => tag.TagName == tagName);
        }

        //create new tag
        public async Task<(bool Succeeded, string[] Errors, Tag? tag)> CreateTag(Tag tag) {
            if (TagExits(tag.TagName)) return (false, new []{"Tag already exists"}, null);
            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();
            return (true, new []{"Create tag successfully"}, tag);
        }

        //read a tag with id
        public async Task<Tag?> GetTagWithId(int id){
            var tag = await _context.Tags.FindAsync(id);
            return tag;
        }

        public async Task<Tag?> GetTagWithName(string tagName){
            var tag = await _context.Tags.FirstOrDefaultAsync(tag => tag.TagName == tagName);
            return tag;
        }

        //read list tag
        public async Task<IEnumerable<Tag>> GetListTag(){
            return await _context.Tags.ToListAsync<Tag>();
        }

        //update a tag
        public async Task<(bool Succeeded, string[] Errors)> UpdateTag(int id, Tag tagModel){
            var tag = await _context.Tags.FindAsync(id);
            if(tag==null) return (false, new []{"User not found"});

            if(TagExits(tagModel.TagName)) return (false, new []{"Tag already exists"});

            tag.TagName = tagModel.TagName;
            await _context.SaveChangesAsync();
            return (true, new [] {"Create tag successfully"});
        }

        //delete a tag 
        public async Task<bool> DeleteTag(int id){
            var tag = await _context.Tags.FindAsync(id);
            if(tag==null) return false;
            
            _context.Remove(tag);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}