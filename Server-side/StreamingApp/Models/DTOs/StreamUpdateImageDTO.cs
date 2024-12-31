namespace StreamingApp.Models.DTOs
{
    public class StreamUpdateImageDTO
    {
        public int StreamId { get; set; }
        public IFormFile ImagePath { get; set; }
    }
}