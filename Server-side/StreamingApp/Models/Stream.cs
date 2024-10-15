using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server_side.Models
{
    public class Stream
    {
        [Key]
        [Required]
        public int StreamId { get; set; }
        public int UserId { get; set; }
        public string StreamTitle { get; set; }
        public string StreamDesc { get; set; }
        public DateTime StreamDate { get; set; }
        public bool IsLive { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}