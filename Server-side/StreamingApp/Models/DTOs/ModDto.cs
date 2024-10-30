using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Models.DTOs
{
    public class ModDto
    {
        [Required]
        public int channelId { get; set; }

        [Required]
        public int userId { get; set; }
        
    }
}