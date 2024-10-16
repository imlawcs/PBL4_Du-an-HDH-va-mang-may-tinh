using System;

namespace StreamingApp.Models.Entities
{
    public class RoomInfo
    {
        public string? RoomID { get; set; }
        public string? RoomName { get; set; }
        public string? HostConnectionID { get; set; }
        public List<string> UserConnections { get; set; } = new List<string>();  // New: Store all connections in the room
    }
}