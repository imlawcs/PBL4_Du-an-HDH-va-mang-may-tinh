using StreamingApp.Models.Entities;
using StreamingApp.Models.DTOs;

namespace StreamingApp.Services
{
    public interface IUserService
{
        Task<User> GetUserByIdAsync(int id);
        Task<String> GetUserByIdAsyncWithRole(int id);
        Task<String> GetAllUsersAsync();
        Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(UserUpdateDto model);
        Task<bool> DeleteUserAsync(int id);
        Task<(bool Succeeded, string[] Errors)> UpdatePasswordAsync(UserUpdatePasswordDto userUpdatePasswordDto);
        Task<String> GetUserByNameAsync(string name);
        Task<(bool Succeeded, string[] Errors)> UpdateImageUserAsync(int id, UserUpdateImageDTO model);
    }
}