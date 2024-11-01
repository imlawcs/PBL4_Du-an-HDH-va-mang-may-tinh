using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.Entities
{
    [Table("Role")]
    public class Role
    {
        [Key] [Required]
        public int RoleId { get; set; }

        [MaxLength(100)]
        public string RoleName { get; set; }

        [MaxLength(100)]
        public string RoleDesc { get; set; }

        public ICollection<User_Role> UserRoles { get; set; }
    }
}