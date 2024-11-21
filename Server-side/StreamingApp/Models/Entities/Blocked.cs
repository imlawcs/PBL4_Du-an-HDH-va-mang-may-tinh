using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.Entities
{
    public class Blocked
    {
        [Key, Column(Order = 0)]
        [Required]
        public int ChannelId  { get; set; }

        [Key, Column(Order = 1)]
        [Required]
        public int BlockedId { get; set; }
        public virtual User Blocker { get; set; }
        public virtual User BlockedUser { get; set; }

    }
}