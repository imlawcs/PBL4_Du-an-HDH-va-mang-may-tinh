using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models
{
    public class Blocked
    {
        [Key, Column(Order = 0)]
        [Required]
        public int UserId { get; set; }

        [Key, Column(Order = 1)]
        public int UserIdBlock { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("UserIdBlock")]
        public virtual User BlockedUser { get; set; }
    }
}