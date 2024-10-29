using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace StreamingApp.Models.Entities
{
public class User
{       [Key]
        [Required]
        public int UserId { get; set; }
        public int RoleId { get; set; }

        [MaxLength(100)]
        public string UserName { get; set; }
        [MaxLength(100)]
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

        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }

        public ICollection<Blocked> BlockedUsers { get; set; }
        public ICollection<Blocked> BlockedByUsers { get; set; }

        public ICollection<Following> Followings { get; set; }
        public ICollection<Following> Followers { get; set; }

        public ICollection<Moderator> Moderators { get; set; }
        public ICollection<Moderator> ModeratorOf { get; set; }

        public ICollection<Notification> Notifications { get; set; }
}}