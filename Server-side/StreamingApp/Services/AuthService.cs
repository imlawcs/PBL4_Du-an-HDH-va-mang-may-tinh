using BCrypt.Net;
using StreamingApp.Models.Entities;
using StreamingApp.Exceptions;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public User LoginUser(LoginModel login)
    {
        try {
            // Truy vấn cơ sở dữ liệu để tìm người dùng
            var user = _context.Users.FirstOrDefault(u => u.Username == login.Username);

            if (user != null && BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
            {
                return new User { Username = user.Username };
            }
            else {
                return null;
            }
        }
        catch (Exception ex)
        {
            throw new CustomException {
                ErrorCode = 500,
                Message = "Invalid username or password"
            };
        }
    }

    // public User GetUserByUsername(string username)
    // {
    //     var user = _context.Users.FirstOrDefault(u => u.Username == username);
    //     if (user == null)
    //     {
    //         return null;
    //     }
    //     return new User { Username = user.Username, Password = user.Password, Email = user.Email };
    // }

    public User RegisterUser(RegisterModel registerModel)
    {
        // Kiểm tra xem username có tồn tại hay không
        if (_context.Users.Any(u => u.Username == registerModel.Username))
        {
            throw new CustomException {
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
            RegisterDate = DateTime.Now
        };

        _context.Users.Add(user);
        _context.SaveChanges();

        return new User
        {
            Username = user.Username,
            Password = user.Password,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            DisplayName = user.DisplayName,
            RegisterDate = user.RegisterDate
        };
    }
}
