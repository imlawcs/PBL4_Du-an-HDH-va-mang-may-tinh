using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers
{
    public class UserManager{
        private readonly AppDbContext _context;

        public UserManager(AppDbContext context) {
            _context = context;
        }

        //create new user
        public async Task<User> CreateUser(User user) {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        //read list
        public async Task<IEnumerable<User>> GetUsers() {
            return await _context.Users.ToListAsync();
        }

        //read by id
        public async Task<User?> GetUserById(int id) {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;
            return user;
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
            await _context.SaveChangesAsync();
            return userToUpdate;
        }

        //delete
        public async Task<bool> DeleteUser(int id) {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}