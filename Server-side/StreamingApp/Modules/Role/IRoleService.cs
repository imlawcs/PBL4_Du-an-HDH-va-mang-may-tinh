using StreamingApp.Models.Entities;

namespace StreamingApp.Services{
    public interface IRoleService
    {
        Task<(bool Succeeded, string[] Errors)> AssignRole(int channelId, int userId, int roleId);
        Task<(bool Succeeded, string[] Errors)> RemoveRole(int channelId, int userId, int roleId);
        Task<(bool Succeeded, string[] Errors)> IsRoleAssigned(int channelId, int userId, int roleId);
        Task<(bool Succeeded, string[] Errors)> AssignChannelModAsync(int channelId, int userId);
        Task<(bool Succeeded, string[] Errors)> RemoveChannelModAsync(int channelId, int userId);
        Task<IEnumerable<User>> GetChannelModAsync(int channelId);
        Task<(bool Succeeded, string[] Errors)> IsChannelModAsync(int channelId, int userId);
        Task<Role?> GetRoleByIdAsync(int roleId);
    }
}