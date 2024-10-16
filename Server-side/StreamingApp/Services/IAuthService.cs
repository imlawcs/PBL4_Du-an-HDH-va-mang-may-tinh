using StreamingApp.Models.Entities;

public interface IAuthService
{
    User AuthenticateUser(LoginModel loginModel);
    User GetUserByUsername(string username);  // Thêm hàm lấy người dùng theo username
    User RegisterUser(RegisterModel registerModel);  // Thêm hàm đăng ký người dùng mới
}
