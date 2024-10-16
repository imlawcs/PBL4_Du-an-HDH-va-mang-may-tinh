using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using StreamingApp.Models.Entities;

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
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            var user = _authService.AuthenticateUser(loginModel);

            if (user != null)
            {
                var token = GenerateToken(user);
                return Ok(new { token });
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel registerModel)
        {
            // Kiểm tra xem username đã tồn tại hay chưa
            var existingUser = _authService.GetUserByUsername(registerModel.Username);
            if (existingUser != null)
            {
                return BadRequest(new { message = "Username already exists" });
            }

            // Tạo người dùng mới
            var newUser = _authService.RegisterUser(registerModel);
            if (newUser != null)
            {
                return Ok(new { message = "User registered successfully" });
            }

            return BadRequest(new { message = "User registration failed" });
        }

        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

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
