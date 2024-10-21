using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.Entities
{
    public class Category
    {
        [Key]
        [Required]
        public int CategoryId { get; set; }

        [MaxLength(100)]
        public string CategoryName { get; set; }
        
        [MaxLength(100)]
        public string CategoryDesc { get; set; }
        
        

    }
}