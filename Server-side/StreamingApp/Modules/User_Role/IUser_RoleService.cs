using StreamingApp.Models.Entities;
using StreamingApp.Models.DTOs;

namespace StreamingApp.Services{
public interface IUser_RoleService
{
        Task<UserRoleDetailDto?> GetUser_RoleByIdAsync(int UserId, int RoleId, int ChannelOwnerId);
        Task<IEnumerable<UserRoleDetailDto>> GetListUser_RoleByIdAsync(int UserId);
        Task<IEnumerable<UserRoleDetailDto>> GetAllUser_RolesAsync();
        Task<(bool Succeeded, string[] Errors)> UpdateUser_RoleAsync(int UserId, int RoleId, int ChannelOwnerId, User_Role model);
        Task<User_Role> CreateUser_RoleAsync(User_Role model);
        Task<bool> DeleteUser_RoleAsync(int id);
        Task<bool> DeleteUser_RoleAsync(int UserId, int RoleId, int ChannelOwnerId);
}
}
