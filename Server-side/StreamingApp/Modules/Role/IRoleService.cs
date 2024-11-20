using StreamingApp.Models.Entities;

namespace StreamingApp.Services{
    public interface IRoleService
    {
        Task<Role?> GetRoleByIdAsync(int roleId);
        Task<Role[]?> GetAllRoles();
        Task<int> GetRoleByUserIdAsync(int userId);
        //for admin 
        Task<(bool Succeeded, string[] Errors)> AssignRole(int channelId, int userId, int roleId);
        Task<(bool Succeeded, string[] Errors)> RemoveRole(int channelId, int userId, int roleId);
        //for channel owner
        Task<(bool Succeeded, string[] Errors)> AssignChannelModAsync(int channelId, int userId);
        Task<(bool Succeeded, string[] Errors)> RemoveChannelModAsync(int channelId, int userId);
        Task<IEnumerable<User>> GetChannelModAsync(int channelId);
    }
}