using Microsoft.AspNetCore.Identity;
using StreamingApp.Models.Entities;
using StreamingApp.Managers;
using StreamingApp.Services;
namespace StreamingApp.Services
{
    public class RoleService : IRoleService
    {
        private readonly RoleManager roleManager;

        public RoleService(RoleManager roleManager)
        {
            roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
        }


        public Task<(bool Succeeded, string[] Errors)> AssignRole(int channelId, int userId, int roleId)
        {
            return roleManager.AssignRole(channelId, userId, roleId);
        }

        public Task<(bool Succeeded, string[] Errors)> RemoveRole(int channelId, int userId, int roleId)
        {
            return roleManager.RemoveRole(channelId, userId, roleId);
        }

        public Task<IEnumerable<User>> GetChannelModAsync(int channelId)
        {
            return roleManager.GetChannelModAsync(channelId);
        }

        public Task<(bool Succeeded, string[] Errors)> IsChannelModAsync(int channelId, int userId)
        {
            return roleManager.IsChannelModAsync(channelId, userId);
        }
        public Task<(bool Succeeded, string[] Errors)> AssignChannelModAsync(int channelId, int userId)
        {
            return roleManager.AssignChannelModAsync(channelId, userId);
        }

        public Task<(bool Succeeded, string[] Errors)> RemoveChannelModAsync(int channelId, int userId)
        {
            return roleManager.RemoveChannelModAsync(channelId, userId);
        }

        Task<(bool Succeeded, string[] Errors)> IRoleService.IsRoleAssigned(int channelId, int userId, int roleId)
        {
            throw new NotImplementedException();
        }
    }
}