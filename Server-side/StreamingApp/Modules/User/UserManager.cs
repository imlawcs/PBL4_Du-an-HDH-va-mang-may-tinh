using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers
{
    public class UserManager{
        private readonly AppDbContext _context;
        private readonly User_RoleManager _userRoleManager;

        public UserManager(AppDbContext context, User_RoleManager userRoleManager) {
            _context = context;
            _userRoleManager = userRoleManager;
        }

        //create new user
        public async Task<User> CreateUser(User user) {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        //read list

        public async Task<List<User>> GetListUsertoUser()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<String> GetListUser()
        {
        var users = await _context.Users.ToListAsync();
        var userDtoList = new List<UserDto>();

        foreach (var user in users)
        {
            // Lấy roles cho từng user
            var roles = await _userRoleManager.GetListUser_Role(user.UserId);

            userDtoList.Add(new UserDto
            {
                UserId = user.UserId,
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                Bio = user.Bio,
                ProfilePic = user.ProfilePic,
                RegisterDate = user.RegisterDate,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                UserStatus = user.UserStatus,
                IsEmailNoti = user.IsEmailNoti,
                Roles = roles
            });
        }

        var options = new JsonSerializerOptions
        {
            Converters = { new ConditionalChannelOwnerIdConverter() }
        };

        return JsonSerializer.Serialize(userDtoList, options);
        }

        // read by id
        public async Task<User?> GetUserById(int id) {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == id);
            if (user == null) return null;
            return user;
        }
        public async Task<String> GetUserByIdWithRole(int userId)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null) return null;

            // Sử dụng User_RoleManager để lấy roles
            var roles = await _userRoleManager.GetListUser_Role(userId);

            var userDto = new UserDto
            {
                UserId = user.UserId,
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                Bio = user.Bio,
                ProfilePic = user.ProfilePic,
                RegisterDate = user.RegisterDate,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                UserStatus = user.UserStatus,
                IsEmailNoti = user.IsEmailNoti,
                Roles = roles
            };
            var options = new JsonSerializerOptions
            {
                Converters = { new ConditionalChannelOwnerIdConverter() }
            };

            return JsonSerializer.Serialize(userDto, options);
        }

        //update
        public async Task<User?> UpdateUser(int id, User user) {
            var userToUpdate = await _context.Users.FindAsync(id);
            if (userToUpdate == null) return null;
            
            userToUpdate.UserName = user.UserName;
            userToUpdate.Password = user.Password;
            userToUpdate.DisplayName = user.DisplayName;
            userToUpdate.Bio = user.Bio;
            userToUpdate.ProfilePic = user.ProfilePic;
            userToUpdate.Email = user.Email;
            userToUpdate.PhoneNumber = user.PhoneNumber;
            userToUpdate.IsEmailNoti= user.IsEmailNoti;
            userToUpdate.UserStatus = user.UserStatus;
            await _context.SaveChangesAsync();
            return userToUpdate;
        }

        //delete
        public async Task<bool> DeleteUser(int id) {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;
            await _userRoleManager.DeleteUser_Role(id);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        internal async Task<String> GetUserByName(string name)
        {
            var user = await _context.Users.Where<User>(u => u.UserName == name).FirstOrDefaultAsync();
            if (user == null) return null;
            
            var userResult = await GetUserByIdWithRole(user.UserId);
            return userResult;
        }        

        public async Task<User?> GetUserByUserName(string userName)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            if (user == null) return null;
            return user;
        }
    }
}