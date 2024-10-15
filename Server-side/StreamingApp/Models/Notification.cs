using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models
{
    public class Notification
    {
        [Key]
        [Required]
        public int NotiId { get; set; }
        public int UserId { get; set; }
        public string NotiDesc { get; set; }
        public DateTime NotiDate { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}