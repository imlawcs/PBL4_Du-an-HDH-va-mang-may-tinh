using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using StreamingApp.Controllers;

namespace StreamingApp.Models.Entities
{
    public class User_Role
    {
        [Key, Column(Order = 0)]
        public int UserId { get; set; }

        [Key, Column(Order = 1)]
        public int RoleId { get; set; }
        
        [Key, Column(Order = 2)]
        public int ChannelOwnerId { get; set; }


        public virtual User? User { get; set; }
        
        
        public virtual Role? Role { get; set; }
        
        public virtual User? ChannelOwner { get; set; }
        
    }
}