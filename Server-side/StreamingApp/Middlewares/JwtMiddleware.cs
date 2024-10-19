using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using StreamingApp.Exceptions;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _config;

    public JwtMiddleware(RequestDelegate next, IConfiguration config)
    {
        _next = next;
        _config = config;
    }

    // Middleware này sẽ kiểm tra token trong header của request
    public async Task Invoke(HttpContext context)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

        if (token != null)
            AttachUserToContext(context, token);
        else
            throw new CustomException{
                ErrorCode = 401,
                Message = "Invalid token"
            };

        await _next(context);
    }

    // Hàm này sẽ kiểm tra token và gán thông tin user vào HttpContext
    private void AttachUserToContext(HttpContext context, string token)
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
            var userId = jwtToken.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value;

            // Gán thông tin user vào HttpContext
            context.Items["User"] = userId;
        }
        catch
        {
            throw new CustomException{
                ErrorCode = 401,
                Message = "Invalid token"
            };
        }
    }

    // private void Authorization (HttpContext context) {
    //     var user = context.Items["User"];
    //     if (user == null)
    //     {
    //         context.Response.StatusCode = 401;
    //         context.Response.WriteAsync("Unauthorized");

    //         return;
        
    //     }
    // }
}
