using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
namespace StreamingApp.Models.Entities
{
public class User
{       [Key]
        [Required]
        public int UserId { get; set; }

        [MaxLength(100)]
        public string UserName { get; set; }
        [MaxLength(100)]
        [JsonIgnore]
        public string Password { get; set; }
        [MaxLength(100)]
        public string DisplayName { get; set; }
        [MaxLength(100)]
        public string? Bio { get; set; }
        [MaxLength(100)]
        public string? ProfilePic { get; set; }
        public DateTime RegisterDate { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }
        [MaxLength(100)]
        public string PhoneNumber { get; set; }
        public bool? UserStatus { get; set; }
        public bool? IsEmailNoti { get; set; }

        public virtual ICollection<Blocked> BlockedUsers { get; set; }
        public virtual ICollection<Blocked> BlockedByUsers { get; set; }

        public virtual ICollection<Following> Followings { get; set; }
        public virtual ICollection<Following> Followers { get; set; }

        
        public virtual ICollection<Notification> Notifications { get; set; }

        public virtual ICollection<User_Role> UserRoles { get; set; }
        
}}