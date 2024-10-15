using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models
{
    public class StreamCategory
    {
        [Key, Column(Order = 0)]
        [Required]
        public int StreamId { get; set; }
        [Key, Column(Order = 1)]
        public int CategoryId { get; set; }
        [ForeignKey("StreamId")]
        public virtual Stream Stream { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }
    }
}