using Newtonsoft.Json;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers
{
    public class StreamRoomManager
    {
        public List<StreamRoom>? StreamRooms { get; set; }

        public StreamRoomManager()
        {
            StreamRooms = [];
        }
        /// <summary>
        /// Get all rooms
        /// </summary>
        /// <returns>ICollection<StreamRoom> StreamRooms</returns>
        public List<StreamRoom> GetAllRooms()
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
            this.StreamRooms.Add(room);
            foreach (var room1 in StreamRooms)
            {
                Console.WriteLine("Room in list: " + room1.RoomName);
            }
            // UpdateRooms(StreamRooms);
            return GetRoomByHostConnectionId(connectionId);
        }

        public object? GetRoomById(int id)
        {
            return this.StreamRooms.FirstOrDefault(room => room.StreamId.Equals(id));

        }
        public object? GetRoomByHostConnectionId(string HostConnectionId)
        {
            return this.StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(HostConnectionId));
        }
        public StreamRoom GetRoomByName(string name)
        {
            if (StreamRooms == null)
            {
                Console.WriteLine("StreamRooms list is null.");
                return null;
            }
            foreach (var room in StreamRooms)
            {
                Console.WriteLine("Room in list: " + room.RoomName);
            }
            return StreamRooms.FirstOrDefault(room => room.RoomName.Equals(name, StringComparison.Ordinal));
        }

        public object? RemoveConnection(string connectionId)
        {
            foreach (var room in StreamRooms)
            {
                if (room.HostConnectionId.Equals(connectionId, StringComparison.Ordinal))
                {
                    //xoa phong
                    DeleteRoomByHostConnectionId(connectionId);
                    return room;
                }
                foreach (var joiner in room.StreamJoiners)
                {
                    if (joiner.ConnectionId.Equals(connectionId, StringComparison.Ordinal))
                    {
                        //remove joiner
                        RemoveJoinerFromRoom(room.HostConnectionId, connectionId);
                        return room.HostConnectionId;
                    }
                }
            }
            return null;
        }

        public object? AddJoinerToRoom(StreamJoiner joiner, string HostConnectionId)
        {
            var room = StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(HostConnectionId, StringComparison.Ordinal));
            if(room.StreamJoiners.FirstOrDefault(joiner => joiner.ConnectionId.Equals(joiner.ConnectionId, StringComparison.Ordinal)) != null)
            {
                this.RemoveJoinerFromRoom(HostConnectionId, joiner.ConnectionId);
            }
            room.StreamJoiners.Add(joiner);
            room.Viewers += 1;
            var update = UpdateRoomByHostConnectionId(HostConnectionId, room);
            return update;
        }
        public object? RemoveJoinerFromRoom(string HostConnectionId, string joinerConnectionId)
        {
            var room = StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(HostConnectionId, StringComparison.Ordinal));
            room.StreamJoiners.Remove(room.StreamJoiners.FirstOrDefault(joiner => joiner.ConnectionId.Equals(joinerConnectionId, StringComparison.Ordinal)));
            room.Viewers -= 1;
            var update = UpdateRoomByHostConnectionId(HostConnectionId, room);
            return update;
        }

        public object? DeleteRoomByStreamId(int id)
        {
            var room = StreamRooms.FirstOrDefault(room => room.StreamId.Equals(id));
            this.StreamRooms.Remove(room);
            return room;
        }
        public object? DeleteRoomByHostConnectionId(string HostConnectionId)
        {
            var room = StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(HostConnectionId));
            StreamRooms.Remove(room);
            return room;
        }
        public object? DeleteRoomByName(string name)
        {
            var room = StreamRooms.FirstOrDefault(room => room.RoomName.Equals(name, StringComparison.Ordinal));
            this.StreamRooms.Remove(room);
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
        public object UpdateRoomByHostConnectionId(string HostConnectionId, StreamRoom room)
        {
            var roomToUpdate = StreamRooms.FirstOrDefault(room => room.HostConnectionId.Equals(HostConnectionId));
            roomToUpdate = room;
            return roomToUpdate;
        }
        public object? UpdateRooms(List<StreamRoom> rooms)
        {
            this.StreamRooms = rooms;
            return StreamRooms;
        }
    }
}