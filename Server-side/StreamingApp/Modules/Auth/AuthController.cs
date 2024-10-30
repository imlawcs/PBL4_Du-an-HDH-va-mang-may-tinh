using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using StreamingApp.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using StreamingApp.Exceptions;

namespace StreamingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAuthService _authService;

        public AuthController(IConfiguration config, IAuthService authService)
        {
            _config = config;
            _authService = authService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            try
            {
                var user = _authService.LoginUser(loginModel);

                if (user != null)
                {
                    var token = GenerateToken(user);
                    return Ok(new { token });
                }

                return Unauthorized();
            }
            catch (CustomException ex)
            {
                return BadRequest(new { error = ex.Message }); // Trả về thông điệp lỗi cụ thể
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal server error", details = ex.Message }); // Trả về thông điệp lỗi chung
            }
        }


        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] RegisterModel registerModel)
        {
            if (registerModel == null)
            {
                return BadRequest(new { message = "Invalid registration data." });
            }

            try
            {
                // Tạo người dùng mới
                var newUser = _authService.RegisterUser(registerModel);
                if (newUser != null)
                {
                    return Ok(new { message = "User registered successfully" });
                }

                return BadRequest(new { message = "User registration failed" });
            }
            catch (CustomException ex)
            {
                // Trả về lỗi cụ thể từ CustomException
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Trả về lỗi chung nếu có lỗi khác
                return StatusCode(500, new { message = "Internal server error", details = ex.Message });
            }
        }


        public string GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()), // Thêm claim NameIdentifier
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.RoleId.ToString()) // Thêm các claim khác nếu cần
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: null, // Bạn có thể đặt issuer nếu cần
                audience: null, // Bạn có thể đặt audience nếu cần
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpGet("profile")]
        public IActionResult GetUserProfile()
        {
            var userId = HttpContext.Items["User"];
            if (userId == null)
            {
                return Unauthorized(new { message = "Unauthorized" });
            }

            // Trả về thông tin người dùng (ví dụ userId hoặc profile)
            return Ok(new { userId });
        }
    }
}
