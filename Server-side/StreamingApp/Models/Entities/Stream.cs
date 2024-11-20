using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.Entities {
    public class Stream
    {
        [Key]
        public int StreamId { get; set; }
        public int UserId { get; set; }  
        public DateTime StreamDate { get; set; }
        public bool IsLive { get; set; }

        [MaxLength(100)]
        public string StreamTitle { get; set; }
        [MaxLength(100)]
        public string StreamDesc { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        public ICollection<StreamCategory> StreamCategories { get; set; } = new List<StreamCategory>();

    }
}