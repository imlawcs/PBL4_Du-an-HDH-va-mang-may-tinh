using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.Entities
{
    public class Notification
    {
        [Key] [Required]
        public int Id {get; set;}
        public int? StreamId { get; set; } 
        public int UserId { get; set; }
        public string? Type { get; set; }
        public bool IsRead { get; set; }

        [MaxLength(100)]
        public string? Message { get; set; }

        public DateTime NotiDate { get; set; }

        public virtual User? Streamer { get; set; }
        
        public virtual User? User { get; set; }
    }
}