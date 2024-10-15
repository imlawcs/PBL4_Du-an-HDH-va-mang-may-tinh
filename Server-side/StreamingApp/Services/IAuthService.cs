public interface IAuthService
{
    UserModel AuthenticateUser(LoginModel loginModel);
    UserModel GetUserByUsername(string username);  // Thêm hàm lấy người dùng theo username
    UserModel RegisterUser(RegisterModel registerModel);  // Thêm hàm đăng ký người dùng mới
}
