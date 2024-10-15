using System.ComponentModel.DataAnnotations;

namespace Server_side.Models
{
    public class Tag
    {
        [Key]
        [Required]
        public int TagId { get; set; }
        public string TagName { get; set; }
    }
}