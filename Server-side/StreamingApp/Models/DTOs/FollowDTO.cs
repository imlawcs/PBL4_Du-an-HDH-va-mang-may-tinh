using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Models.DTOs
{
    public class FollowDTO
    {
        [Required]
        public int ChannelId { get; set; }
        [Required]
        public int FollowerId { get; set; }
    }
}