using BCrypt.Net;
using StreamingApp.Models.Entities;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public User AuthenticateUser(LoginModel login)
    {
        // Truy vấn cơ sở dữ liệu để tìm người dùng
        var user = _context.Users.FirstOrDefault(u => u.Username == login.Username);

        if (user != null && BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
        {
            return new User { Username = user.Username };
        }

        return null;
    }

    public User GetUserByUsername(string username)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == username);
        if (user == null)
        {
            return null;
        }
        return new User { Username = user.Username, Password = user.Password, Email = user.Email };
    }

    public User RegisterUser(RegisterModel registerModel)
    {
        // Kiểm tra xem username có tồn tại hay không
        if (_context.Users.Any(u => u.Username == registerModel.Username))
        {
            throw new Exception("Username already exists");
        }

        // Tạo một người dùng mới
        var user = new User
        {
            Username = registerModel.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(registerModel.Password), // Hash mật khẩu
            Email = registerModel.Email
        };

        _context.Users.Add(user);
        _context.SaveChanges();

        return new User
        {
            Username = user.Username,
            Password = user.Password,
            Email = user.Email
        };
    }
}
