using StreamingApp.Models.Entities;

namespace StreamingApp.Services{
    public interface IRoleService
    {
        Task<Role> CreateRole(Role role);
        Task<Role?> GetRoleByIdAsync(int id);
        Task<IEnumerable<Role>> GetAllRolesAsync();
        Task<(bool Succeeded, string[] Errors)> UpdateRole(int id, Role model);
        Task<bool> DeleteRole(int id);
    }
}