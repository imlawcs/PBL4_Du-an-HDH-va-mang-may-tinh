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
        var user = _context.Users.FirstOrDefault(u => u.UserName == login.Username);

        if (user != null && BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
        {
            return new User { UserName = user.UserName };
        }

        return null;
    }

    public User GetUserByUsername(string username)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserName == username);
        if (user == null)
        {
            return null;
        }
        return new User { UserName = user.UserName, Password = user.Password, Email = user.Email };
    }

    public User RegisterUser(RegisterModel registerModel)
    {
        // Kiểm tra xem UserName có tồn tại hay không
        if (_context.Users.Any(u => u.UserName == registerModel.Username))
        {
            throw new Exception("UserName already exists");
        }

        // Tạo một người dùng mới
        var user = new User
        {
            UserName = registerModel.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(registerModel.Password), // Hash mật khẩu
            Email = registerModel.Email
        };

        _context.Users.Add(user);
        _context.SaveChanges();

        return new User
        {
            UserName = user.UserName,
            Password = user.Password,
            Email = user.Email
        };
    }
}
