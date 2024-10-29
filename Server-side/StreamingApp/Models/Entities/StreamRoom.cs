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

        public StreamRoom()
        {
            StreamJoiners = [];
        }
        public object GetJoinerByConnectionId(string connectionId)
        {
            return StreamJoiners.FirstOrDefault(joiner => joiner.ConnectionId.Equals(connectionId));
        }
        public object AddJoiner(StreamJoiner joiner)
        {
            StreamJoiners.Add(joiner);
            return this.GetJoinerByConnectionId(joiner.ConnectionId);
        }
        public object RemoveJoinerByConnectionId(string connectionId)
        {
            var joiner = StreamJoiners.FirstOrDefault(joiner => joiner.ConnectionId.Equals(connectionId));
            StreamJoiners.Remove(joiner);
            return this.GetJoinerByConnectionId(connectionId);
        }


    }
}