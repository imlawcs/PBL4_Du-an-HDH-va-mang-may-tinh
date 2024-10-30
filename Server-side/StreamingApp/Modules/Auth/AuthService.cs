using BCrypt.Net;
using StreamingApp.Models.Entities;
using StreamingApp.Exceptions;
using System.Text.Json;
using System.Text.RegularExpressions;
using StreamingApp.Services;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;

    // Khởi tạo AuthService với AppDbContext để tương tác với cơ sở dữ liệu
    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public User LoginUser(LoginModel login)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserName == login.Username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
        {
            throw new CustomException
            {
                ErrorCode = 401,
                Message = "Invalid username or password"
            };
        }

        return new User
        {
            UserId = user.UserId,
            Email = user.Email ?? string.Empty,
            RoleId = user.RoleId
        };
    }

    public User RegisterUser(RegisterModel registerModel)
    {
        if (_context.Users.Any(u => u.UserName == registerModel.Username))
        {
            throw new CustomException
            {
                ErrorCode = 400,
                Message = "Username already exists"
            };
        }

        var user = new User
        {
            UserName = registerModel.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(registerModel.Password), 
            Email = registerModel.Email,
            PhoneNumber = registerModel.PhoneNumber,
            DisplayName = registerModel.DisplayName,
            RegisterDate = DateTime.Now,
            RoleId = 2 
        };

        try
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        catch (Exception ex)
        {
            throw new CustomException
            {
                ErrorCode = 500,
                Message = $"Error saving user: {ex.Message}"
            };
        }

        return new User
        {
            UserId = user.UserId,
            UserName = user.UserName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            DisplayName = user.DisplayName,
            RegisterDate = user.RegisterDate,
            RoleId = user.RoleId
        };
    }

    // Xử lý đăng nhập bên ngoài (như Google, Facebook)
    public async Task<User> ProcessExternalLogin(ClaimsPrincipal principal, string provider)
    {
        // Lấy email từ claims của người dùng
        var email = principal.FindFirstValue(ClaimTypes.Email);
        // Tìm người dùng dựa trên email
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
        {
            // Tạo người dùng mới nếu không tồn tại
            user = new User
            {
                Email = email,
                UserName = email, // Bạn có thể chọn tạo username dựa trên email
                Password = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()), // Mật khẩu ngẫu nhiên
                RoleId = 2 // Phân quyền mặc định cho người dùng mới
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync(); // Lưu người dùng mới vào cơ sở dữ liệu
        }

        // Trả về người dùng đã đăng nhập
        return user;
    }

    // Cấu hình các thuộc tính cho xác thực bên ngoài (OAuth)
    public AuthenticationProperties ConfigureExternalAuthenticationProperties(string provider, string redirectUrl)
    {
        // Tạo các thuộc tính xác thực với redirect URL
        var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
        // Có thể thêm thông tin khác vào properties nếu cần
        return properties;
    }
}
