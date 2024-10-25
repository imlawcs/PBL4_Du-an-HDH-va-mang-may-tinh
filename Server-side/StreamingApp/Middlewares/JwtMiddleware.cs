using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _config;

    public JwtMiddleware(RequestDelegate next, IConfiguration config)
    {
        _next = next;
        _config = config;
    }

    public async Task Invoke(HttpContext context)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        // Bỏ qua middleware cho các yêu cầu đến login, register và webrtc
        if (context.Request.Path.StartsWithSegments("/api/auth/login") || context.Request.Path.StartsWithSegments("/api/auth/register") || context.Request.Path.StartsWithSegments("/webrtc"))
        {
            await _next(context); // Bỏ qua middleware cho yêu cầu đến login và register
            return;
        }
        if (token != null)
        {
            await AttachUserToContext(context, token);
            if (context.Response.HasStarted)
            {
                return; // Nếu phản hồi đã bắt đầu, dừng xử lý
            }
        }
        else
        {
            context.Response.StatusCode = 401; // Unauthorized
            await context.Response.WriteAsync("Invalid token");
            return; // Ngăn không cho tiếp tục xử lý request
        }

        await _next(context);
    }

    private async Task AttachUserToContext(HttpContext context, string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);

            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;

            // Kiểm tra xem claim có tồn tại không
            var userIdClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                context.Response.StatusCode = 401; // Unauthorized
                await context.Response.WriteAsync("Invalid token: Missing NameIdentifier claim");
                return; // Ngăn không cho tiếp tục xử lý request
            }

            var userId = userIdClaim.Value;

            // Gán thông tin user vào HttpContext
            context.Items["User"] = userId;
        }
        catch (Exception ex)
        {
            // Nếu token không hợp lệ, trả về mã lỗi 401 và thông báo
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync($"Invalid token: {ex.Message}");
            return; // Ngăn không cho tiếp tục xử lý request
        }
    }
}
