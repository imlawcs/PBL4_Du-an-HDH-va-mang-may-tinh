using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using StreamingApp.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using StreamingApp.Exceptions;
using Microsoft.AspNetCore.Authentication;
using StreamingApp.Services;

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

        // Tạo JWT token cho người dùng sau khi xác thực thành công
        public string GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()), 
                new Claim(ClaimTypes.Email, user.Email),
                // new Claim(ClaimTypes.Role, user.RoleId.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],  
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Xác thực người dùng qua tên đăng nhập và mật khẩu
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

                return Unauthorized(new { error = "Invalid username or password." });
            }
            catch (CustomException ex)
            {
                return BadRequest(new { error = ex.Message }); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Internal server error", details = ex.Message });
            }
        }

        // Đăng ký người dùng mới
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
                var newUser = _authService.RegisterUser(registerModel);
                if (newUser != null)
                {
                    return Ok(new { message = "User registered successfully" });
                }

                return BadRequest(new { message = "User registration failed" });
            }
            catch (CustomException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", details = ex.Message });
            }
        }

        // Bắt đầu quy trình xác thực với Google
        [HttpGet("oauth/google")]
        [AllowAnonymous]
        public IActionResult GoogleLogin(string returnUrl = "/")
        {
            var redirectUrl = Url.Action(nameof(HandleGoogleResponse), "Auth", new { returnUrl });
            var properties = _authService.ConfigureExternalAuthenticationProperties("Google", redirectUrl);
            return Challenge(properties, "Google");
        }

        // Bắt đầu quy trình xác thực với Facebook
        [HttpGet("oauth/facebook")]
        [AllowAnonymous]
        public IActionResult FacebookLogin(string returnUrl = "/")
        {
            var redirectUrl = Url.Action(nameof(HandleFacebookResponse), "Auth", new { returnUrl });
            var properties = _authService.ConfigureExternalAuthenticationProperties("Facebook", redirectUrl);
            return Challenge(properties, "Facebook");
        }

        // Bắt đầu quy trình xác thực với Twitter
        [HttpGet("oauth/twitter")]
        [AllowAnonymous]
        public IActionResult TwitterLogin(string returnUrl = "/")
        {
            var redirectUrl = Url.Action(nameof(HandleTwitterResponse), "Auth", new { returnUrl });
            var properties = _authService.ConfigureExternalAuthenticationProperties("Twitter", redirectUrl);
            return Challenge(properties, "Twitter");
        }

        // Xử lý phản hồi từ Google sau khi xác thực
        [HttpGet("oauth/response")]
        [AllowAnonymous]
        public async Task<IActionResult> HandleGoogleResponse(string returnUrl = "/")
        {
            var result = await HttpContext.AuthenticateAsync("Google");
            if (result.Succeeded)
            {
                var user = await _authService.ProcessExternalLogin(result.Principal, "Google");
                var token = GenerateToken(user);
                return Redirect(returnUrl + "?token=" + token);
            }
            return Redirect(returnUrl + "?error=login_failed");
        }

        // Xử lý phản hồi từ Facebook sau khi xác thực
        [HttpGet("oauth/response/facebook")]
        [AllowAnonymous]
        public async Task<IActionResult> HandleFacebookResponse(string returnUrl = "/")
        {
            var result = await HttpContext.AuthenticateAsync("Facebook");
            if (result.Succeeded)
            {
                var user = await _authService.ProcessExternalLogin(result.Principal, "Facebook");
                var token = GenerateToken(user);
                return Redirect(returnUrl + "?token=" + token);
            }
            return Redirect(returnUrl + "?error=login_failed");
        }

        // Xử lý phản hồi từ Twitter sau khi xác thực
        [HttpGet("oauth/response/twitter")]
        [AllowAnonymous]
        public async Task<IActionResult> HandleTwitterResponse(string returnUrl = "/")
        {
            var result = await HttpContext.AuthenticateAsync("Twitter");
            if (result.Succeeded)
            {
                var user = await _authService.ProcessExternalLogin(result.Principal, "Twitter");
                var token = GenerateToken(user);
                return Redirect(returnUrl + "?token=" + token);
            }
            return Redirect(returnUrl + "?error=login_failed");
        }

        // Lấy thông tin hồ sơ người dùng
        [HttpGet("profile")]
        public IActionResult GetUserProfile()
        {
            var userId = HttpContext.Items["User"];
            if (userId == null)
            {
                return Unauthorized(new { message = "Unauthorized" });
            }

            return Ok(new { userId });
        }

        // Đăng xuất người dùng
        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            // Thực hiện đăng xuất
            HttpContext.SignOutAsync(); // Đăng xuất khỏi các nhà cung cấp xác thực
            return Ok(new { message = "Logged out successfully." });
        }

        // Bắt đầu quy trình đăng nhập bên ngoài
        [HttpGet("login/{provider}")]
        [AllowAnonymous]
        public IActionResult ExternalLogin(string provider, string redirectUrl)
        {
            var redirectUri = Url.Action("ExternalLoginCallback", "Auth", new { provider, redirectUrl });
            var properties = _authService.ConfigureExternalAuthenticationProperties(provider, redirectUri);
            return Challenge(properties, provider);
        }
    }
}
