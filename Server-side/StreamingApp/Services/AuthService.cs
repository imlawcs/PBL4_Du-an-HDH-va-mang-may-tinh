using BCrypt.Net;
using StreamingApp.Models.Entities;
using StreamingApp.Exceptions;
using System.Text.Json;
using System.Text.RegularExpressions;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public User LoginUser(LoginModel login)
    {
        // Truy vấn cơ sở dữ liệu để tìm người dùng
        var user = _context.Users.FirstOrDefault(u => u.UserName == login.Username);

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
            UserName = user.UserName,
            Email = user.Email ?? string.Empty, // Tránh lỗi null
            PhoneNumber = user.PhoneNumber ?? string.Empty // Tránh lỗi null
            // Không trả về Password vì lý do bảo mật
        };
    }


    public User RegisterUser(RegisterModel registerModel)
    {
        // Kiểm tra xem username có tồn tại hay không
        if (_context.Users.Any(u => u.UserName == registerModel.Username))
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
            UserName = registerModel.Username,
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
            UserName = user.UserName,
            Password = user.Password, // Mật khẩu không nên được trả về
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            DisplayName = user.DisplayName,
            RegisterDate = user.RegisterDate,
            RoleId = user.RoleId
        };
    }
}
