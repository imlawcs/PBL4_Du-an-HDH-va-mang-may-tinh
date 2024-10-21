using System.ComponentModel.DataAnnotations;

public class LoginModel
{
    [Required]
    public string Username { get; set; }
    public string Password { get; set; }
}