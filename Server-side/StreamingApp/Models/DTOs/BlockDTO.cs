using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Models.DTOs
{
    public class BlockDTO {
        [Required]
        public int ChannelId { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}