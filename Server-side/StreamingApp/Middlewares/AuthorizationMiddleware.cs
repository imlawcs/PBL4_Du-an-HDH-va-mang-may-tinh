using Microsoft.AspNetCore.Http;
using StreamingApp.Models.Entities;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using StreamingApp.Exceptions;
using StreamingApp.Enums;

public class AuthorizationMiddleware
{
    private readonly RequestDelegate _next;

    public AuthorizationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    private string getRoleNameById(HttpContext context)
    {
        var roleIdClaim = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);
        if (roleIdClaim != null && int.TryParse(roleIdClaim.Value, out int roleId))
        {
            return ((UserRole)roleId).ToString(); 
        }
        else
        {
            throw new CustomException{
                ErrorCode = StatusCodes.Status401Unauthorized,
                Message = "User is not authenticated."
            };
        }
    }


    public async Task Invoke(HttpContext context)
    {
        try {
            if (context.Request.Path.StartsWithSegments("/api/auth/login") || context.Request.Path.StartsWithSegments("/api/auth/register") || context.Request.Path.StartsWithSegments("/webrtc"))
            {
                await _next(context); 
                return;
            }

            var endpoint = context.GetEndpoint();
            var requiredRole = endpoint?.Metadata.GetMetadata<RequireRoleAttribute>()?.Role;
            var userRole = getRoleNameById(context);

            // Kiểm tra xem người dùng có đủ quyền hay không
            if (requiredRole != null && !IsUserAuthorized(userRole, requiredRole))
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden; // Forbidden
                await context.Response.WriteAsync("Access Denied.");
                return; 
            }

            await _next(context); 
        }
        catch (CustomException ex)
        {
            context.Response.StatusCode = ex.ErrorCode;
            await context.Response.WriteAsync(ex.Message);
        }
    }

    private bool IsUserAuthorized(string userRole, string requiredRole)
    {
        return userRole == requiredRole;
    }
}
