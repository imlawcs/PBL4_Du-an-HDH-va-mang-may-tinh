using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.Entities
{
    [Table("Tag")]
    public class Tag
    {
        [Key] [Required]
        public int TagId { get; set; }

        [MaxLength(100)]
        public string TagName { get; set; }
    }
}