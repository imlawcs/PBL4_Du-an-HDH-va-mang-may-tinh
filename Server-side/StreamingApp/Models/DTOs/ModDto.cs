using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Models.DTOs
{
    public class ModDTO
    {
        [Required]
        public int ChannelId { get; set; }

        [Required]
        public int UserId { get; set; }
        
    }
}