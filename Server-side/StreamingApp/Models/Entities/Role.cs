using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace StreamingApp.Models.Entities
{
    [Table("Role")]
    public class Role
    {
        [Key] [Required]
        [JsonIgnore]
        public int RoleId { get; set; }

        [MaxLength(100)]
        public string RoleName { get; set; }

        [MaxLength(100)]
        public string RoleDesc { get; set; }

        [JsonIgnore]
        public virtual ICollection<User_Role> UserRoles { get; set; }
    }
}