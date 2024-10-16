using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.Entities
{
    public class Following
    {
        [Key]
        [Required]
        public int FollowerId { get; set; } //người theo dõi

        [Key]
        [Required]
        public int FolloweeId { get; set; } //người được theo dõi

        [Required]
        public bool IsMuted {get; set;}

        public virtual User? Follower { get; set; }

        public virtual User? Followee { get; set; }

    }
}