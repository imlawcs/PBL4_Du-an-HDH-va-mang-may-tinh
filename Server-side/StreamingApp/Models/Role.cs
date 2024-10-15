using System.ComponentModel.DataAnnotations;

namespace Server_side.Models
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