using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;
using StreamingApp.Managers;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Data.SqlClient;

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
            if(model.Bio != null)
            user.Bio = model.Bio;
            if(model.ProfilePic != null)
            user.ProfilePic = model.ProfilePic;
            user.Email = model.Email;
            if(model.PhoneNumber != null)
            user.PhoneNumber = model.PhoneNumber;
            if(model.IsEmailNoti != null)
            user.IsEmailNoti = model.IsEmailNoti;

            try
            {
                await UserManager.UpdateUser(model.UserId, user);
                return (true, Array.Empty<string>());
            }
            //catch trùng username

            catch (DbUpdateException ex)
            {
                var sqlException = ex.InnerException as SqlException;
                if (sqlException != null)
                {
                    // Log the error number and message
                    Console.WriteLine($"SQL Error Number: {sqlException.Number}, Message: {sqlException.Message}");

                    // Check for unique constraint violation
                    if (sqlException.Number == 2627 || sqlException.Number == 2601)
                    {
                        return (false, new[] { "Username is already taken" });
                    }
                }
                return (false, new[] { "Failed to update user" });
            }
            catch (Exception ex)
            {
                // Log the general exception
                Console.WriteLine($"Exception: {ex.Message}");
                return (false, new[] { "Failed to update user" });
            } 
        }
        public async Task<(bool Succeeded, string[] Errors)> UpdatePasswordAsync(UserUpdatePasswordDto model)
        {
            var user = await UserManager.GetUserById(model.UserId);

            if (user == null)
            {
                return (false, new[] { "User not found" });
            }

            if (!BCrypt.Net.BCrypt.Verify(model.OldPassword, user.Password))
            {
                return (false, new[] { "Old password is incorrect" });
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);

            try
            {
                await UserManager.UpdateUser(model.UserId, user);
                return (true, Array.Empty<string>());
            }
            catch (DbUpdateException)
            {
                return (false, new[] { "Failed to update password" });
            }
        }
    }
}