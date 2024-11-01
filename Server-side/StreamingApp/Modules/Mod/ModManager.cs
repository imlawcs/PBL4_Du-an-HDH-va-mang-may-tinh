using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers
{
    public class ModManager
    {
        private readonly AppDbContext _context;
        private readonly UserManager _userManager;

        public ModManager(AppDbContext context, UserManager userManager) {
            _context = context;
            _userManager = userManager;
        }

        public async Task<(bool Succeeded, string[] Errors)> AssignChannelModAsync( int channelId, int userId)
        {
            var channel = await _context.Users.FindAsync(channelId);
            if (channel == null) return (false, new string[] { "Channel not found" });


            var user = await _context.Users.FindAsync(userId);
            if (user == null) return (false, new string[] { "User not found" });

            var isModResult = await IsChannelModAsync(channelId, userId);
            if (isModResult.Succeeded) return (false, new string[] { "User is already a moderator" });

            var mod = new Moderator
            {
                UserId = channelId,
                UserIdModerator = userId
            };

            // _context.Moderators.Add(mod);
            await _context.SaveChangesAsync();
            if(mod == null) return (false, new string[] { "Moderator not assigned" });
            return (true, new string[] {"Moderator assigned"});
        }

        public async Task<(bool Succeeded, string[] Errors)> RemoveChannelModAsync(int channelId, int userId)
        {
            // var mod = await _context.Moderators.FindAsync(channelId, userId);
            // if (mod == null) return (false, new string[] { "Moderator not found" });

            // _context.Moderators.Remove(mod);
            await _context.SaveChangesAsync();
            return (true, new string[] {"Moderator removed"});
        }

        public async Task<IEnumerable<User>> GetChannelModAsync(int channelId)
        {
            // var users = await _context.Moderators
            // .Where(m => m.UserId == channelId)
            // .Select(m => m.ModeratorUser)
            // .Where(u => u != null)
            // .ToListAsync();

            // return users!;
            return null;
        }

        public async Task<(bool Succeeded, string[] Errors)> IsChannelModAsync(int channelId, int userId)
        {
            // var mod = await _context.Moderators.FindAsync(channelId, userId);
            // return (mod != null, new string[] { mod == null ? "User is not a moderator" : "User is a moderator" });
            return (false, new string[] { "User is not a moderator" });
        }
    }
}