using Microsoft.AspNetCore.Identity;
using StreamingApp.Models.Entities;
using StreamingApp.Managers;
using StreamingApp.Services;


public class RoleService : IRoleService
{
    AppDbContext _context;
    public RoleService(AppDbContext context)
    {
        _context = context;
    }
    public Task<Role> CreateRole(Role role)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteRole(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Role>> GetAllRolesAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Role?> GetRoleByIdAsync(int id)
    {
        return _context.Roles.FindAsync(id).AsTask();    
    }

    public Task<(bool Succeeded, string[] Errors)> UpdateRole(int id, Role model)
    {
        throw new NotImplementedException();
    }
}