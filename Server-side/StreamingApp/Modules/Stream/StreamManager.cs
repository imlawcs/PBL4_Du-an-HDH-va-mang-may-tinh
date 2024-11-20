using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace StreamingApp.Managers
{
    public class StreamManager
    {
        private readonly AppDbContext _context;
        private readonly UserManager _userManager;

        public StreamManager(AppDbContext context, UserManager userManager) {
            _context = context;
            _userManager = userManager;
        }

        public async Task<Models.Entities.Stream?> GetStreamByIdAsync(int id) {
            return await _context.Streams.Include(s => s.User)
            .Include(s => s.StreamTags)
            .Include(s => s.StreamCategories)
            .FirstOrDefaultAsync(s => s.StreamId == id);
        }


        public async Task<IEnumerable<Models.Entities.Stream>> GetAllStreamsAsync() {
            return await _context.Streams.Include(s => s.User)
            .Include(s => s.StreamTags)
            .Include(s => s.StreamCategories)
            .ToListAsync();
        }

        public async Task<bool> DeleteStreamAsync(int id) {
            var stream = await _context.Streams.FindAsync(id);
            if (stream == null) {
                return false;
            }

            _context.Streams.Remove(stream);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<(bool Succeeded, string[] Errors)> CreateStreamAsync(Models.Entities.Stream stream) {
            var user = await _userManager.GetUserById(stream.UserId);
            if (user == null) {
                return (false, new []{"User not found"});
            }

            _context.Streams.Add(stream);
            await _context.SaveChangesAsync();
            return (true, new []{"Create stream successfully"});
        }

        public async Task<(bool Succeeded, string[] Errors)> UpdateStreamAsync(Models.Entities.Stream stream) {
            var streamToUpdate = await _context.Streams.FindAsync(stream.StreamId);
            if (streamToUpdate == null) {
                return (false, new []{"Stream not found"});
            }

            streamToUpdate.StreamTitle = stream.StreamTitle;
            streamToUpdate.StreamDesc= stream.StreamDesc;
            streamToUpdate.IsLive = stream.IsLive;

            await _context.SaveChangesAsync();
            return (true, new [] {"Update stream successfully"});
        }
    }
}