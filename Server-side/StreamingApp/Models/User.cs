using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server_side.Models
{
    public class User
    {
        [Key]
        [Required]
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Bio { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }
        public DateTime RegisterDate { get; set; }
        public string UserPhone { get; set; }
        public bool UserStatus { get; set; }
        public bool IsEmailNoti { get; set; }
        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }
    }
}