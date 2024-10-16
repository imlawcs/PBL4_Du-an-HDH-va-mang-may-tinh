using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.Entities
{
    public class Moderator
    {
        [Key, Column(Order = 0)]
        [Required]
        public int UserId { get; set; }

        [Key, Column(Order = 1)]
        [Required]
        public int UserIdModerator { get; set; }

        public virtual User? User { get; set; }

        public virtual User? ModeratorUser { get; set; }

    }
}