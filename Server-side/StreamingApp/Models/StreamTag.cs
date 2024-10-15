using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server_side.Models
{
    public class StreamTag
    {
        [Key, Column(Order = 0)]
        [Required]
        public int StreamId { get; set; }
        [Key, Column(Order = 1)]
        public int TagId { get; set; }
        [ForeignKey("StreamId")]
        public virtual Stream Stream { get; set; }
        [ForeignKey("TagId")]
        public virtual Tag Tag { get; set; }
    }
}