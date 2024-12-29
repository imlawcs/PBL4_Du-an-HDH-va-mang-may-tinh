using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.DTOs
{
    public class CategoryDTO
    {
        public string CategoryName { get; set; }
        public string CategoryDesc { get; set; }
        public IFormFile? ImagePath { get; set; }
    }
}