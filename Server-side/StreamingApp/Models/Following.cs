using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server_side.Models
{
    public class Following
    {
        [Key, Column(Order = 0)]
        [Required]
        public int UserId { get; set; }
        [Key, Column(Order = 1)]
        [ForeignKey("UserIdFollowed")]
        public virtual User User { get; set; }
        
        public int UserIdFollowed { get; set; }
        [ForeignKey("UserIdFollowed")]
        public virtual User FollowedUser { get; set; }
        public bool IsMuted { get; set; }
    }
}