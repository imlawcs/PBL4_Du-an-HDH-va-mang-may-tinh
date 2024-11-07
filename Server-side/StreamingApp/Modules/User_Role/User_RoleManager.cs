using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers{
    public class User_RoleManager{
        private readonly AppDbContext _context;

        public User_RoleManager(AppDbContext context) {
            _context = context;
        }

        //create new User_Role
        public async Task<User_Role> CreateUser_Role(User_Role user_Role) {
            _context.User_Roles.Add(user_Role);
            await _context.SaveChangesAsync();
            return user_Role;
        }

        //read a User_Role with id user, id role and id channel
        public async Task<User_Role?> GetUser_RoleWithId(int UserId, int RoleId, int ChannelOwnerId){
            var User_Role = await _context.User_Roles.Where(x => x.UserId == UserId && x.RoleId == RoleId && x.ChannelOwnerId == ChannelOwnerId)
            .Include(ur => ur.Role) .FirstOrDefaultAsync<User_Role>();
            return User_Role;
        }

        //read list User_Role with id
        public async Task<IEnumerable<User_Role>> GetListUser_Role(int id){
            var user_Roles = await _context.User_Roles.Where(x => x.UserId == id)
            .Include(ur => ur.Role) .ToListAsync<User_Role>();
            return user_Roles;
        }

        //read list User_Role 
        public async Task<IEnumerable<User_Role>> GetListUser_Role(){
            var allUser_Roles = await _context.User_Roles
            .Include(ur => ur.Role) 
            .ToListAsync<User_Role>();
            return await _context.User_Roles.ToListAsync<User_Role>();
        }

        //update a User_Role
        public async Task<(bool Succeeded, string[] Errors)> UpdateUser_Role(int UserId, int RoleId, int ChannelOwnerId, User_Role Model){
            var User_Role = await GetUser_RoleWithId(UserId, RoleId, ChannelOwnerId);
            if(User_Role == null) return (false, new []{"User_Role not found"});
            
            User_Role.RoleId = Model.RoleId;
            User_Role.ChannelOwnerId = Model.ChannelOwnerId;
            await _context.SaveChangesAsync();
            return (true, new [] {"Create User_Role successfully"});
        }

        //delete a User_Role 
        public async Task<bool> DeleteUser_Role(int UserId, int RoleId, int ChannelOwnerId){
            var User_Role = await GetUser_RoleWithId(UserId, RoleId, ChannelOwnerId);
            if(User_Role==null) return false;
            
            _context.Remove(User_Role);
            await _context.SaveChangesAsync();
            return true;
        }

        //delete all User_Role with id
        public async Task<bool> DeleteUser_Role(int id){
            var User_Roles = await GetListUser_Role(id);
            if(User_Roles == null) return false;
            
            _context.RemoveRange(User_Roles);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}