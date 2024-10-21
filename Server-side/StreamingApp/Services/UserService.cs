using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;
using StreamingApp.Managers;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace StreamingApp.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager UserManager;

        public UserService(UserManager userManager)
        {
            UserManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        }

        public Task<bool> DeleteUserAsync(int id)
        {
            return UserManager.DeleteUser(id);
        }

        public Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return UserManager.GetUsers();
        }

        public Task<User> GetUserByIdAsync(int id)
        {
            return UserManager.GetUserById(id);
        }


        public async Task<(bool Succeeded, string[] Errors)> UpdateUserAsync(UserUpdateDto model)
        {
            var user = await UserManager.GetUserById(model.UserId);

            if (user == null)
            {
                return (false, new[] { "User not found" });
            }

            user.UserName = model.UserName;
            user.DisplayName = model.DisplayName;
            user.Bio = model.Bio;
            user.ProfilePic = model.ProfilePic;
            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;
            user.IsEmailNoti = model.IsEmailNoti;
            

            if (!string.IsNullOrEmpty(model.Password))
            {
                user.Password = HashPassword(model.Password);
            }

            try
            {
                await UserManager.UpdateUser(model.UserId, user);
                return (true, Array.Empty<string>());
            }
            catch (DbUpdateException)
            {
                return (false, new[] { "Failed to update user" });
            }
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
    }
}