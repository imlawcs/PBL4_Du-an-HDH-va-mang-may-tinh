namespace StreamingApp.Models.Entities
{
    public class StreamRoom
    {
        public string? HostConnectionId { get; set; }
        public int StreamId { get; set; }
        public string? RoomName { get; set; }
        public int Viewers { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<StreamJoiner>? StreamJoiners { get; set; }
        
    }
}