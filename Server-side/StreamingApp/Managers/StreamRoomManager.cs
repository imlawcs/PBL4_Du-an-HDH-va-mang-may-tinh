using StreamingApp.Models.Entities;

namespace StreamingApp.Managers
{
    public class StreamRoomManager
    {
        public ICollection<StreamRoom>? StreamRooms { get; set; }

        public StreamRoomManager()
        {
            StreamRooms = [];
        }
        /// <summary>
        /// Get all rooms
        /// </summary>
        /// <returns>ICollection<StreamRoom> StreamRooms</returns>
        public ICollection<StreamRoom> GetAllRooms()
        {
            return StreamRooms;
        }
        /// <summary>
        /// Create a new room
        /// </summary>
        /// <param name="room">StreamRoom room</param>
        /// <returns>StreamRoom room</returns>
        public object? CreateRoom(string hostName, string connectionId)
        {
            var temp = StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(connectionId));
            if (temp != null) 
            return null;
            var room = new StreamRoom
            {
                HostConnectionId = connectionId,
                StreamId = StreamRooms.Count + 1,
                RoomName = hostName,
                Viewers = 0,
                CreatedAt = DateTime.Now,
                StreamJoiners = []
            };
            StreamRooms.Add(room);
            return room;
        }

        public object? GetRoomById(int id)
        {
            return StreamRooms.FirstOrDefault(room => room.StreamId.Equals(id));

        }
        public object? GetRoomByHostConnectionId(string HostConnectionId)
        {
            return StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(HostConnectionId));
        }
        public object? GetRoomByName(string name)
        {
            return StreamRooms.FirstOrDefault(room => room.RoomName.Equals(name, StringComparison.Ordinal));
        }

        public object? AddJoinerToRoom(StreamJoiner joiner, string HostConnectionId)
        {
            var room = StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(HostConnectionId, StringComparison.Ordinal));
            room.StreamJoiners.Add(joiner);
            room.Viewers += 1;
            return room;
        }
        public object? RemoveJoinerFromRoom(string HostConnectionId, string joinerConnectionId)
        {
            var room = StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(HostConnectionId, StringComparison.Ordinal));
            room.StreamJoiners.Remove(room.StreamJoiners.FirstOrDefault(joiner => joiner.ConnectionId.Equals(joinerConnectionId, StringComparison.Ordinal)));
            room.Viewers -= 1;
            return room;
        }

        public object? DeleteRoomByStreamId(int id)
        {
            var room = StreamRooms.FirstOrDefault(room => room.StreamId.Equals(id));
            StreamRooms.Remove(room);
            return room;
        }
        public object? DeleteRoomByHostConnectionId(int HostConnectionId)
        {
            var room = StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(HostConnectionId));
            StreamRooms.Remove(room);
            return room;
        }
        public object? DeleteRoomByName(string name)
        {
            var room = StreamRooms.FirstOrDefault(room => room.RoomName.Equals(name, StringComparison.Ordinal));
            StreamRooms.Remove(room);
            return room;
        }




        public object UpdateRoomById(int id, StreamRoom room)
        {
            var roomToUpdate = StreamRooms.FirstOrDefault(room => room.StreamId.Equals(id));
            roomToUpdate = room;
            return roomToUpdate;
        }
        public object UpdateRoomByName(string name, StreamRoom room)
        {
            var roomToUpdate = StreamRooms.FirstOrDefault(room => room.RoomName.Equals(name, StringComparison.Ordinal));
            roomToUpdate = room;
            return roomToUpdate;
        }
        public object UpdateRoomByHostConnectionId(int HostConnectionId, StreamRoom room)
        {
            var roomToUpdate = StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(HostConnectionId));
            roomToUpdate = room;
            return roomToUpdate;
        }
    }
}