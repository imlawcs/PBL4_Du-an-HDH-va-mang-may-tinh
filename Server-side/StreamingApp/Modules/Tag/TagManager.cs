using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers{
    public class TagManager{
        private readonly AppDbContext _context;

        public TagManager(AppDbContext context) {
            _context = context;
        }

        //create new tag
        public async Task<Tag> CreateTag(Tag tag) {
            _context.Tags.Add(tag);
            await _context.SaveChangesAsync();
            return tag;
        }

        //read a tag with id
        public async Task<Tag?> GetTagWithId(int id){
            var tag = await _context.Tags.FindAsync(id);
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