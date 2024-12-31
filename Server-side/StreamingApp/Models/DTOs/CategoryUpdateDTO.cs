using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.DTOs
{
    public class CategoryUpdateDTO
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDesc { get; set; }
        public IFormFile? ImagePath { get; set; }
    }
}