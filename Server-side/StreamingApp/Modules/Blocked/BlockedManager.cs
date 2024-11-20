using StreamingApp.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace StreamingApp.Managers
{
    public class BlockedManager {
        private readonly AppDbContext _context;

        public BlockedManager(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(bool Succeeded, string[] Errors)> BlockUser(int channelId, int userId)
        {
            var blocked = new Blocked
            {
                ChannelId = channelId,
                BlockedId = userId
            };

            _context.Blockeds.Add(blocked);
            await _context.SaveChangesAsync();

            return (true, Array.Empty<string>());
        }

        public async Task<Blocked[]> GetBlockedByChannelIdAsync(int channelId)
        {
            return await _context.Blockeds.Where(b => b.ChannelId == channelId).ToArrayAsync();
        }

        public async Task<Blocked[]> GetAllBlocked()
        {
            return await _context.Blockeds.ToArrayAsync();
        }

        public async Task<Blocked?> GetBlockedByIdAsync(int blockedId)
        {
            return await _context.Blockeds.FirstOrDefaultAsync(b => b.ChannelId == blockedId);
        }

        public async Task<(bool Succeeded, string[] Errors)> UnblockUser(int channelId, int userId)
        {
            var blocked = await _context.Blockeds.FirstOrDefaultAsync(b => b.ChannelId == channelId && b.BlockedId == userId);

            if (blocked == null)
            {
                return (false, new string[] { "User is not blocked" });
            }

            _context.Blockeds.Remove(blocked);
            await _context.SaveChangesAsync();

            return (true, Array.Empty<string>());
        }
    }
}