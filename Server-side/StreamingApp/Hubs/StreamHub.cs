using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using StreamingApp.Managers;
using StreamingApp.Models;
using StreamingApp.Models.Entities;

namespace StreamingApp.Hubs
{
    public class StreamHub : Hub
    {
        private static RoomManager roomManager = new();

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            roomManager.DeleteRoom(Context.ConnectionId);
            _ = NotifyRoomInfoAsync(false);
            return base.OnDisconnectedAsync(exception);
        }

        public async Task CreateRoom(string name, string username)
        {
            string userName = string.IsNullOrEmpty(username) ? Context.ConnectionId : username;
            RoomInfo roomInfo = roomManager.CreateRoom(userName, name);
            if (roomInfo != null)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, roomInfo.RoomID);
                await Clients.Caller.SendAsync("created", roomInfo.RoomID, userName);
                await NotifyRoomInfoAsync(false);
                await Clients.Caller.SendAsync("ready");
            }
            else
            {
                await Clients.Caller.SendAsync("error", "error occurred when creating a new room.");
            }
        }

        public async Task Join(string roomId, string clientName)
        {
            string userName = string.IsNullOrEmpty(clientName) ? Context.ConnectionId : clientName;
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
            await Clients.Caller.SendAsync("joined", roomId, userName);
            await Clients.Group(roomId).SendAsync("userJoined", userName);
            await Clients.Caller.SendAsync("ready");
        }

        public async Task LeaveRoom(string roomId, string clientName)
        {
            string userName = string.IsNullOrEmpty(clientName) ? Context.ConnectionId : clientName;
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
            roomManager.LeaveRoom(roomId, Context.ConnectionId);
            await Clients.Group(roomId).SendAsync("userLeft", userName);

            if (roomManager.GetAllRoomInfo().FirstOrDefault(r => r.RoomID == roomId)?.UserConnections.Count == 0)
            {
                roomManager.DeleteRoom(int.Parse(roomId));
                await Clients.Group(roomId).SendAsync("roomClosed", roomId);
            }
        }

        public async Task GetRoomInfo()
        {
            await NotifyRoomInfoAsync(true);
        }

        public async Task NotifyRoomInfoAsync(bool notifyOnlyCaller)
        {
            List<RoomInfo> roomInfos = roomManager.GetAllRoomInfo();
            var list = from room in roomInfos
                       select new
                       {
                           RoomId = room.RoomID,
                           Name = room.RoomName,
                           Button = "<button class=\"joinButton\">Join!</button>"
                       };
            var data = JsonConvert.SerializeObject(list);

            if (notifyOnlyCaller)
            {
                await Clients.Caller.SendAsync("updateRoom", data);
            }
            else
            {
                await Clients.All.SendAsync("updateRoom", data);
            }
        }
    }
}