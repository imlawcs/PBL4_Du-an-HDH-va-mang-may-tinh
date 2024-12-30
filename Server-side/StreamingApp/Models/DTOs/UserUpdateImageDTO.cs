namespace StreamingApp.Models.DTOs
{
    public class UserUpdateImageDTO
    {
        public int UserId { get; set; }
        public IFormFile ImagePath { get; set; }
    }
}