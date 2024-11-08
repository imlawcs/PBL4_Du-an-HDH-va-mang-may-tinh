using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using StreamingApp.Controllers;

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
        
        [Key, Column(Order = 2)]
        public int ChannelOwnerId { get; set; }

        [JsonIgnore]
        public virtual User? User { get; set; }
        
        [JsonIgnore]
        public virtual Role? Role { get; set; }
        [JsonIgnore]
        public virtual User? ChannelOwner { get; set; }
        
        [NotMapped]
        [JsonPropertyName("roles")]
        public string RoleName => Role?.RoleName ?? "";

        // [JsonPropertyName("userId")]
        // public int? OptionalUserId => User_RoleController._shouldIncludeUserId ? UserId : (int?)null;

        // [JsonPropertyName("userIdForCreation")]
        // public int UserIdForCreation
        // {
        //     get => UserId; // Trả về giá trị UserId gốc
        //     set => UserId = value; // Thiết lập giá trị cho UserId
        // }

    }
}