using BCrypt.Net;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;

    public AuthService(AppDbContext context)
    {
        _context = context;
    }

    public UserModel AuthenticateUser(LoginModel login)
    {
        // Truy vấn cơ sở dữ liệu để tìm người dùng
        var user = _context.Users.FirstOrDefault(u => u.Username == login.Username);

        if (user != null && BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
        {
            return new UserModel { Username = user.Username };
        }

        return null;
    }

    public UserModel GetUserByUsername(string username)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == username);
        if (user == null)
        {
            return null;
        }
        return new UserModel { Username = user.Username, Password = user.Password, Email = user.Email };
    }

    public UserModel RegisterUser(RegisterModel registerModel)
    {
        // Kiểm tra xem username có tồn tại hay không
        if (_context.Users.Any(u => u.Username == registerModel.Username))
        {
            throw new Exception("Username already exists");
        }

        // Tạo một người dùng mới
        var user = new StreamingApp.Models.User
        {
            Username = registerModel.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(registerModel.Password), // Hash mật khẩu
            Email = registerModel.Email
        };

        _context.Users.Add(user);
        _context.SaveChanges();

        return new UserModel
        {
            Username = user.Username,
            Password = user.Password,
            Email = user.Email
        };
    }
}
