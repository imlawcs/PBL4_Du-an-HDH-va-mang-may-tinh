using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Models
{
    public class Category
    {
        [Key]
        [Required]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDesc { get; set; }
        public virtual ICollection<Stream> Streams { get; set; }
    }
}