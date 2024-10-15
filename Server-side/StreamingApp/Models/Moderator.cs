using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server_side.Models
{
    public class Moderator
    {
        [Key, Column(Order = 0)]
        [Required]
        public int UserId { get; set; }
        [Key, Column(Order = 1)]
        public int UserIdModerator { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        [ForeignKey("UserIdModerator")]
        public virtual User ModeratorUser { get; set; }
    }
}