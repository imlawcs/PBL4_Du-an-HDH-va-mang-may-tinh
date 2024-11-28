using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Models.DTOs
{
    public class NotiDTO
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string? Message { get; set; }
        
        [Required]
        public string? Type { get; set; }
    }
}