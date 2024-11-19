using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace StreamingApp.Models.DTOs
{
    public class UserRoleDetailDto
    {
        private const int ROLE_ID_TO_HIDE_CHANNEL = 1;
        private int roleId;
        public int UserId { get; set; }
        public string Username { get; set; }
        public string RoleName { get; set; }
    
        [JsonIgnore]
        public int RoleId 
        { 
            get => roleId;
            set
            {
                roleId = value;
                ShouldSerializeChannelOwnerId = value != ROLE_ID_TO_HIDE_CHANNEL;
            }
        }

        public int ChannelOwnerId { get; set; }

        // Method để kiểm soát việc serialize ChannelOwnerId
        public bool ShouldSerializeChannelOwnerId { get; private set; } = true;

    }
}