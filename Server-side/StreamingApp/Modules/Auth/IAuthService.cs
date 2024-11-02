using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using StreamingApp.Models.Entities;

public interface IAuthService
{
    User LoginUser(LoginModel login);
    User RegisterUser(RegisterModel registerModel);
    Task<User> ProcessExternalLogin(ClaimsPrincipal principal, string provider);
    AuthenticationProperties ConfigureExternalAuthenticationProperties(string provider, string redirectUrl);
}
