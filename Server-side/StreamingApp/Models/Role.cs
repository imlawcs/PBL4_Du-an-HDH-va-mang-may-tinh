using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Models
{
    public class Role
    {
        [Key]
        [Required]
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string RoleDesc { get; set; }
    }
}