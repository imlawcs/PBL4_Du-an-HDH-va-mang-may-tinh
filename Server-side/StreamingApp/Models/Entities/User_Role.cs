using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace StreamingApp.Models.Entities
{
    public class User_Role
    {
        [JsonIgnore]
        [Key, Column(Order = 0)]
        public int UserId { get; set; }

        
        [JsonIgnore]
        [Key, Column(Order = 1)]
        public int RoleId { get; set; }
        
        public int? ChannelOwnerId { get; set; }

        [JsonIgnore]
        public virtual User? User { get; set; }
        
        [JsonIgnore]
        public virtual Role? Role { get; set; }
        [JsonIgnore]
        public virtual User? ChannelOwner { get; set; }
        [NotMapped]
        [JsonPropertyName("roles")]
        public string RoleName => Role?.RoleName ?? "";

    }
}