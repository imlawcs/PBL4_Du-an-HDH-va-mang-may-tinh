using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Models
{
    public class Tag
    {
        [Key]
        [Required]
        public int TagId { get; set; }
        public string TagName { get; set; }
    }
}