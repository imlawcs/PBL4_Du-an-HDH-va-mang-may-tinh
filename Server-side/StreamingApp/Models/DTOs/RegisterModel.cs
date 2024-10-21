using System.ComponentModel.DataAnnotations;

public class RegisterModel
{
    [Required]
    public string Username { get; set; }

    [Required]
    [MinLength(6)]
    public string Password { get; set; }
    
    [Required]
    [Compare("Password")]
    public string ConfirmPassword { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string DisplayName { get; set; }
    public DateTime RegisterDate { get; set; }

}
