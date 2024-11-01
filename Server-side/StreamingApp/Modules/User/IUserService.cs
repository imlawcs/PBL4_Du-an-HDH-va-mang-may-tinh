using StreamingApp.Models.Entities;
using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;

namespace StreamingApp.Services{
public interface IUserService
{
        Task<User> GetUserByIdAsync(int id);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(UserUpdateDto model);
        Task<bool> DeleteUserAsync(int id);
        Task<(bool Succeeded, string[] Errors)> UpdatePasswordAsync(UserUpdatePasswordDto userUpdatePasswordDto);
}}