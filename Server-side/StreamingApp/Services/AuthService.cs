namespace StreamingApp.Services {
    public class AuthService {
        public int Login(string username, string password) {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password)) {
            throw new ArgumentException("Username or password cannot be empty.");
            }

            // Simulate a login check
            if (username == "admin" && password == "password") {
            return 200; // OK
            } else {
            return 401; // Unauthorized
            }
        }

        public bool Register(string username, string password) {

        }

        public bool Logout() {

        }

        public bool ForgotPassword(string username) {

        }
    }
}