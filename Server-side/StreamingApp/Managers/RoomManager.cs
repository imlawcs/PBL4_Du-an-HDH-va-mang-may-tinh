using System.Collections.Concurrent;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers
{
    public class RoomManager
    {
        private int nextRoomId;
        /// <summary>
        /// Room List (key:RoomId)
        /// </summary>
        private ConcurrentDictionary<int, RoomInfo> rooms;

        public RoomManager()
        {
            nextRoomId = 1;
            rooms = new ConcurrentDictionary<int, RoomInfo>();
        }

        public RoomInfo CreateRoom(string connectionId, string name)
        {
            rooms.TryRemove(nextRoomId, out _);

            //create new room info
            var roomInfo = new RoomInfo
            {
                RoomID = nextRoomId.ToString(),
                RoomName = name,
                HostConnectionID = connectionId
            };
            bool result = rooms.TryAdd(nextRoomId, roomInfo);

            if (result)
            {
                nextRoomId++;
                return roomInfo;
            }
            else
            {
                return null;
            }
        }

        public void DeleteRoom(int roomId)
        {
            rooms.TryRemove(roomId, out _);
        }

        public void DeleteRoom(string connectionId)
        {
            int? correspondingRoomId = null;
            foreach (var pair in rooms)
            {
                if (pair.Value.HostConnectionID.Equals(connectionId))
                {
                    correspondingRoomId = pair.Key;
                }
            }

            if (correspondingRoomId.HasValue)
            {
                rooms.TryRemove(correspondingRoomId.Value, out _);
            }
        }

        public List<RoomInfo> GetAllRoomInfo()
        {
            return [.. rooms.Values];
        }

        public RoomInfo JoinRoom(string roomId, string connectionId)
        {
            if (rooms.TryGetValue(int.Parse(roomId), out var roomInfo))
            {
                roomInfo.UserConnections.Add(connectionId);  // Add user to room
                return roomInfo;
            }
            return null;
        }

        public void LeaveRoom(string roomId, string connectionId)
        {
            if (rooms.TryGetValue(int.Parse(roomId), out var roomInfo))
            {
                roomInfo.UserConnections.Remove(connectionId);  // Remove user from room
                if (roomInfo.UserConnections.Count == 0)  // If room is empty, delete it
                {
                    rooms.TryRemove(int.Parse(roomId), out _);
                }
            }
        }

    }
}