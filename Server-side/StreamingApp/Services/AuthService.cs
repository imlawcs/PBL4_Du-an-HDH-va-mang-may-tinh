using BCrypt.Net;
using StreamingApp.Models.Entities;
using StreamingApp.Exceptions;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context, IConfiguration config)
    {
        _context = context;
    }

    // public string GenerateJwtToken(User user)
    //     {
    //         var tokenHandler = new JwtSecurityTokenHandler();
    //         var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
    //         var tokenDescriptor = new SecurityTokenDescriptor
    //         {
    //             Subject = new ClaimsIdentity(new[]
    //             {
    //                 new Claim(ClaimTypes.NameIdentifier, user.Username.ToString()),
    //                 new Claim(ClaimTypes.Email, user.Email),
    //                 new Claim(ClaimTypes.Role, user.RoleId.ToString())
    //             }),
    //             Expires = DateTime.UtcNow.AddHours(1),
    //             Audience = _config["Jwt:Audience"], // Set the audience
    //             Issuer = _config["Jwt:Issuer"], // Set the issuer
    //             SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    //         };

    //         var token = tokenHandler.CreateToken(tokenDescriptor);
    //         return tokenHandler.WriteToken(token);
    //     }
    public User LoginUser(LoginModel login)
    {
        // Truy vấn cơ sở dữ liệu để tìm người dùng
        var user = _context.Users.FirstOrDefault(u => u.Username == login.Username);

        // Kiểm tra người dùng có tồn tại không
        if (user == null)
        {
            throw new CustomException
            {
                ErrorCode = 401, // Unauthorized
                Message = "Invalid username or password"
            };
        }

        // Kiểm tra mật khẩu
        if (!BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
        {
            throw new CustomException
            {
                ErrorCode = 401, // Unauthorized
                Message = "Invalid username or password"
            };
        }

        // Kiểm tra các thuộc tính có thể null
        return new User
        {
            Username = user.Username,
            Email = user.Email ?? string.Empty, // Tránh lỗi null
            PhoneNumber = user.PhoneNumber ?? string.Empty // Tránh lỗi null
            // Không trả về Password vì lý do bảo mật
        };
    }


    public User RegisterUser(RegisterModel registerModel)
    {
        // Kiểm tra xem username có tồn tại hay không
        if (_context.Users.Any(u => u.Username == registerModel.Username))
        {
            throw new CustomException
            {
                ErrorCode = 400,
                Message = "Username already exists"
            };
        }

        // Tạo một người dùng mới
        var user = new User
        {
            Username = registerModel.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(registerModel.Password), // Hash mật khẩu
            Email = registerModel.Email,
            PhoneNumber = registerModel.PhoneNumber,
            DisplayName = registerModel.DisplayName,
            RegisterDate = DateTime.Now,
            RoleId = 2
        };

        try
        {
            // Thêm người dùng vào context và lưu thay đổi
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error saving user: {ex.Message}");
            throw; // Hoặc xử lý lỗi theo cách khác nếu cần
        }

        return new User
        {
            Username = user.Username,
            Password = user.Password, // Mật khẩu không nên được trả về
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            DisplayName = user.DisplayName,
            RegisterDate = user.RegisterDate,
            RoleId = user.RoleId
        };
    }
}
