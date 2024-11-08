using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers
{
    public class RoleManager
    {
        private readonly AppDbContext _context;
        private readonly UserManager _userManager;

        public RoleManager(AppDbContext context, UserManager userManager) {
            _context = context;
            _userManager = userManager;
        }


        public async Task<(bool Succeeded, string[] Errors)> AssignRole(int channelId, int userId, int roleId)
        {
            var channel = await _context.Users.FindAsync(channelId);
            if (channel == null) return (false, new string[] { "Channel not found" });

            var user = await _context.Users.FindAsync(userId);
            if (user == null) return (false, new string[] { "User not found" });

            var role = await _context.Roles.FindAsync(roleId);
            if (role == null) return (false, new string[] { "Role not found" });

            var isRoleAssignedResult = await IsRoleAssigned(channelId, userId, roleId);
            if (isRoleAssignedResult.Succeeded) return (false, new string[] { "Role is already assigned" });

            var userRole = new User_Role
            {
                UserId = userId,
                RoleId = roleId,
                ChannelOwnerId = channelId
            };

            _context.User_Roles.Add(userRole);
            await _context.SaveChangesAsync();
            if(userRole == null) return (false, new string[] { "Role not assigned" });
            return (true, new string[] {"Role assigned"});
        }


        public async Task<(bool Succeeded, string[] Errors)> RemoveRole(int channelId, int userId, int roleId)
        {
            var userRole = await _context.User_Roles.FindAsync(channelId, userId, roleId);
            if (userRole == null) return (false, new string[] { "Role not found" });

            _context.User_Roles.Remove(userRole);
            await _context.SaveChangesAsync();
            return (true, new string[] {"Role removed"});
        }
        public async Task<(bool Succeeded, string[] Errors)> IsRoleAssigned(int channelId, int userId, int roleId)
        {
            var userRole = await _context.User_Roles.FindAsync(channelId, userId, roleId);
            return (userRole != null, new string[] { userRole == null ? "Role not assigned" : "Role assigned" });
        }
        public async Task<(bool Succeeded, string[] Errors)> AssignChannelModAsync( int channelId, int userId)
        {
            var channel = await _context.Users.FindAsync(channelId);
            if (channel == null) return (false, new string[] { "Channel not found" });


            var user = await _context.Users.FindAsync(userId);
            if (user == null) return (false, new string[] { "User not found" });

            var isModResult = await IsChannelModAsync(channelId, userId);
            if (isModResult.Succeeded) return (false, new string[] { "User is already a moderator" });

            var mod = new User_Role
            {
                UserId = userId,
                RoleId = 3,
                ChannelOwnerId = channelId
            };

            _context.User_Roles.Add(mod);
            await _context.SaveChangesAsync();
            if(mod == null) return (false, new string[] { "Moderator not assigned" });
            return (true, new string[] {"Moderator assigned"});
        }

        public async Task<(bool Succeeded, string[] Errors)> RemoveChannelModAsync(int channelId, int userId)
        {
            var mod = await _context.User_Roles.FindAsync(channelId, userId);
            if (mod == null) return (false, new string[] { "Moderator not found" });

            _context.User_Roles.Remove(mod);
            await _context.SaveChangesAsync();
            return (true, new string[] {"Moderator removed"});
        }

        public async Task<IEnumerable<User>> GetChannelModAsync(int channelId)
        {
            var users = await _context.User_Roles
            .Where(m => m.ChannelOwnerId == channelId)
            .Select(m => m.User)
            .Where(u => u != null)
            .ToListAsync();

            return users!;
        }

        public async Task<(bool Succeeded, string[] Errors)> IsChannelModAsync(int channelId, int userId)
        {
            var mod = await _context.User_Roles.FindAsync(channelId, userId);
            return (mod != null, new string[] { mod == null ? "User is not a moderator" : "User is a moderator" });
        }

        public async Task<(bool Succeeded, string[] Errors)> GetRoleByIdAsync(int roleId)
        {
            var role = await _context.Roles.FindAsync(roleId);
            return (role != null, new string[] { role == null ? "Role not found" : "Role found" });
        }
    }
}