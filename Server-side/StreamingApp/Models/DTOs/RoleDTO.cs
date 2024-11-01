using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Models.DTOs
{
    public class RoleDTO
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public int RoleId { get; set; }
        public int ChannelId { get; set; }
    }
}