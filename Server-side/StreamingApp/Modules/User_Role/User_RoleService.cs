using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;
using StreamingApp.Managers;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Data.SqlClient;
using StreamingApp.Services;

namespace StreamingApp.Services
{
    public class User_RoleService : IUser_RoleService
    {
        private readonly User_RoleManager User_RoleManager;

        public User_RoleService(User_RoleManager user_RoleManager)
        {
            User_RoleManager = user_RoleManager ?? throw new ArgumentNullException(nameof(User_RoleManager));
        }

        public Task<User_Role> CreateUser_RoleAsync(User_Role model)
        {
            return User_RoleManager.CreateUser_Role(model);
        }

        public Task<bool> DeleteUser_RoleAsync(int id)
        {
            return User_RoleManager.DeleteUser_Role(id);
        }

        public Task<bool> DeleteUser_RoleAsync(int UserId, int RoleId, int ChannelOwnerId)
        {
            return User_RoleManager.DeleteUser_Role(UserId, RoleId, ChannelOwnerId);
        }

        public Task<IEnumerable<UserRoleDetailDto>> GetAllUser_RolesAsync()
        {
            return User_RoleManager.GetListUser_Role();
        }

        public Task<IEnumerable<UserRoleDetailDto>> GetListUser_RoleByIdAsync(int UserId)
        {
            return User_RoleManager.GetListUser_Role(UserId);
        }

        public Task<UserRoleDetailDto?> GetUser_RoleByIdAsync(int UserId, int RoleId, int ChannelOwnerId)
        {
            return User_RoleManager.GetUser_RoleWithId(UserId, RoleId, ChannelOwnerId);
        }

        public Task<(bool Succeeded, string[] Errors)> UpdateUser_RoleAsync(int UserId, int RoleId, int ChannelOwnerId, User_Role model)
        {
            return User_RoleManager.UpdateUser_Role(UserId, RoleId, ChannelOwnerId, model);
        }
    }
}