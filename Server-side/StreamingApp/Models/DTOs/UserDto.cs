
namespace StreamingApp.Models.DTOs{
    public class UserDto
    {
        public int UserId { get; set; }            
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        
        public string? Bio { get; set; }
        
        public string? ProfilePic { get; set; }
        public DateTime RegisterDate { get; set; }
        
        public string Email { get; set; }
        
        public string PhoneNumber { get; set; }
        public bool? UserStatus { get; set; }
        public bool? IsEmailNoti { get; set; }

        public IEnumerable<UserRoleDetailDto> Roles { get; set; }
    }
}