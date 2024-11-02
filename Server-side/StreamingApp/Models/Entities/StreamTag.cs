using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.Entities
{
    public class StreamTag
    {
        [Key] [Required]
        public int StreamId { get; set; }

        [Key] [Required]
        public int TagId { get; set; }

        [ForeignKey("StreamId")]
        public virtual Stream? Stream { get; set; }

        [ForeignKey("TagId")]
        public virtual Tag? Tag { get; set; }
       }
}