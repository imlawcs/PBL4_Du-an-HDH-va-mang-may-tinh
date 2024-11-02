using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StreamingApp.Models.Entities
{
    public class User_Role
    {
        [Key, Column(Order = 0)]
        public int UserId { get; set; }

        [Key, Column(Order = 1)]
        public int RoleId { get; set; }
        
        public int? ChannelOwnerId { get; set; }

        public virtual User? User { get; set; }
        public virtual Role? Role { get; set; }
        public virtual User? ChannelOwner { get; set; }
    }
}