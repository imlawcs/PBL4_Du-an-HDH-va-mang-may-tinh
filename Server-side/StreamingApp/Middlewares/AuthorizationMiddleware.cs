using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;

public class AuthorizationMiddleware
{
    private readonly RequestDelegate _next;

    public AuthorizationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        var userId = context.Items["User"];
        
        // Kiểm tra nếu user chưa đăng nhập thì trả về lỗi 401 Unauthorized
        if (userId == null)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("Unauthorized");
            return;
        }

        // Nếu user đã xác thực, tiếp tục chuyển request đến các middleware khác
        await _next(context);
    }
}
