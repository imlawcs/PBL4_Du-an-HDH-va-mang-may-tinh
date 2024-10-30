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
        var user = _context.Users.FirstOrDefault(u => u.UserName == login.Username);

        if (user == null)
        {
            throw new CustomException
            {
                ErrorCode = 401, 
                Message = "Invalid username or password"
            };
        }

        // Kiểm tra mật khẩu
        if (!BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
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
            Console.WriteLine($"Error saving user: {ex.Message}");
            throw; 
        }

        return new User
        {
            UserName = user.UserName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            DisplayName = user.DisplayName,
            RegisterDate = user.RegisterDate,
            RoleId = user.RoleId
        };
    }
}
