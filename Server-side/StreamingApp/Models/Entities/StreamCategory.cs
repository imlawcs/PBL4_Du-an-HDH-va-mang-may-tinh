using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.Entities
{
    public class StreamCategory
    {
        [Key] [Required]
        public int StreamId { get; set; }

        [Key] 
        public int CategoryId { get; set; }

        [ForeignKey("StreamId")]
        public virtual Stream? Stream { get; set; }

        [ForeignKey("CategoryId")]
        public virtual Category? Category { get; set; }
       }
}