using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers{
    public class User_RoleManager{
        private readonly AppDbContext _context;
        private const int ROLE_ID_TO_HIDE_CHANNEL = 1; 

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
        public async Task<UserRoleDetailDto?> GetUser_RoleWithId(int UserId, int RoleId, int ChannelOwnerId){
            var userRole = await _context.User_Roles
            .Include(ur => ur.User)
            .Include(ur => ur.Role)
            .FirstOrDefaultAsync(ur => ur.UserId == UserId && ur.RoleId == RoleId && ur.ChannelOwnerId == ChannelOwnerId);
            if(userRole == null) return null;

            return new UserRoleDetailDto
            {
                RoleId = userRole.RoleId,
                UserId = userRole.UserId,
                Username = userRole.User.UserName,
                RoleName = userRole.Role.RoleName,
                ChannelOwnerId = userRole.ChannelOwnerId
            };
        }

        //read list User_Role with id
        public async Task<IEnumerable<UserRoleDetailDto>> GetListUser_Role(int id){
            var userRoles = await _context.User_Roles
            .Include(ur => ur.User)
            .Include(ur => ur.Role)
            .Where(ur => ur.UserId == id)
            .ToListAsync();

            return userRoles.Select(ur => new UserRoleDetailDto
            {
                RoleId = ur.RoleId,
                UserId = ur.UserId,
                Username = ur.User.UserName,
                RoleName = ur.Role.RoleName,
                ChannelOwnerId = ur.ChannelOwnerId
            }).ToList();
        }

        //read list User_Role 
        public async Task<IEnumerable<UserRoleDetailDto>> GetListUser_Role(){
            var userRoles = await _context.User_Roles
            .Include(ur => ur.User)
            .Include(ur => ur.Role)
            .ToListAsync();

            return userRoles.Select(ur => new UserRoleDetailDto
            {
                RoleId = ur.RoleId,
                UserId = ur.UserId,
                Username = ur.User.UserName,
                RoleName = ur.Role.RoleName,
                ChannelOwnerId = ur.ChannelOwnerId
            }).ToList();
        }

        //update a User_Role
        public async Task<(bool Succeeded, string[] Errors)> UpdateUser_Role(int UserId, int RoleId, int ChannelOwnerId, User_Role Model){
            var existingUserRole = await  _context.User_Roles
            .FirstOrDefaultAsync(u => u.UserId == UserId && u.RoleId == RoleId && u.ChannelOwnerId == ChannelOwnerId);

            if(existingUserRole == null) return (false, new []{"User_Role not found"});

            // Xóa bản ghi cũ
             _context.User_Roles.Remove(existingUserRole);

            // Tạo bản ghi mới với thông tin mới
            var newUserRole = new User_Role
            {
                UserId = Model.UserId,
                RoleId = Model.RoleId,
                ChannelOwnerId = Model.ChannelOwnerId
            };

            await  _context.User_Roles.AddAsync(newUserRole);
            await  _context.SaveChangesAsync();

            return (true, new [] {"Update User_Role successfully"});
        }

        //delete a User_Role 
        public async Task<bool> DeleteUser_Role(int UserId, int RoleId, int ChannelOwnerId){
            var User_Role = await _context.User_Roles
            .FirstOrDefaultAsync(u => u.UserId == UserId && u.RoleId == RoleId && u.ChannelOwnerId == ChannelOwnerId);

            if(User_Role==null) return false;
            
            _context.Remove(User_Role);
            await _context.SaveChangesAsync();
            return true;
        }

        //delete all User_Role with id
        public async Task<bool> DeleteUser_Role(int id){
            var User_Roles = await _context.User_Roles.Where(ur => ur.UserId == id).ToListAsync();
            if(User_Roles == null) return false;
            
            _context.RemoveRange(User_Roles);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}