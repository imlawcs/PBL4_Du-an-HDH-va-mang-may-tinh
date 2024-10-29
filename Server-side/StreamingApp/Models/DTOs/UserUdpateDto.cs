using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Models.DTOs
{
    public class UserUpdateDto
    {
        [Required]
        public int UserId { get; set; }

        [MaxLength(100)]
        public string UserName { get; set; }

        [MaxLength(100)]
        public string DisplayName { get; set; }

        [MaxLength(100)]
        public string? Bio { get; set; }

        [MaxLength(100)]
        public string? ProfilePic { get; set; }

        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        [MaxLength(100)]
        [Phone]
        public string PhoneNumber { get; set; }

        public bool? IsEmailNoti { get; set; }
    }
}