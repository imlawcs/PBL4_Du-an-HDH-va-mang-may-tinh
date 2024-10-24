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
        public object CreateRoom(StreamRoom room)
        {
            StreamRooms.Add(room);
            return room;
        }

        public object GetRoomById(int id)
        {
            return StreamRooms.FirstOrDefault(room => room.StreamId.Equals(id));

        }
        public object GetRoomByHostConnectionId(int HostConnectionId)
        {
            return StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(HostConnectionId));
        }
        public object GetRoomByName(string name)
        {
            return StreamRooms.FirstOrDefault(room => room.RoomName.Equals(name, StringComparison.Ordinal));
        }

        public object AddJoinerToRoom(StreamJoiner joiner, int roomId)
        {
            var room = StreamRooms.FirstOrDefault(room => room.StreamId.Equals(roomId));
            room.StreamJoiners.Add(joiner);
            room.Viewers += 1;
            return room;
        }
        public object RemoveJoinerFromRoom(StreamJoiner joiner, int roomId)
        {
            var room = StreamRooms.FirstOrDefault(room => room.StreamId.Equals(roomId));
            room.StreamJoiners.Remove(joiner);
            room.Viewers -= 1;
            return room;
        }

        public object DeleteRoomByStreamId(int id)
        {
            var room = StreamRooms.FirstOrDefault(room => room.StreamId.Equals(id));
            StreamRooms.Remove(room);
            return room;
        }
        public object DeleteRoomByHostConnectionId(int HostConnectionId)
        {
            var room = StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(HostConnectionId));
            StreamRooms.Remove(room);
            return room;
        }
        public object DeleteRoomByName(string name)
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