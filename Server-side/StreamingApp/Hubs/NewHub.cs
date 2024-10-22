using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using StreamingApp.Managers;
using StreamingApp.Models;
using StreamingApp.Models.Entities;
using System.Threading.Tasks;
using WebSocketSharp;

namespace StreamingApp.Hubs
{
    public class NewHub : Hub
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

        public async Task SendOffer(string clientId, string offer)
        {
            await Clients.Client(clientId).SendAsync("ReceiveOffer", offer, clientId);
        }

        public async Task SendAnswer(string clientId, string answer)
        {
            await Clients.Client(clientId).SendAsync("ReceiveAnswer", answer, clientId);
        }

        public async Task SendIceCandidate(string clientId, string candidate)
        {
            await Clients.Client(clientId).SendAsync("ReceiveIceCandidate", candidate, clientId);
        }

        public async Task SendMessage(string roomId, string clientId, string message)
        {
            await Clients.Group(roomId).SendAsync("ReceiveMessage", message, clientId);
        }

        public async Task CreateRoom(string name, string username)
        {
            string userName = string.IsNullOrEmpty("username") ? Context.ConnectionId : username;
            RoomInfo roomInfo = roomManager.CreateRoom(userName, name);
            if (roomInfo != null)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, roomInfo.RoomID);
                await Clients.Caller.SendAsync("created", roomInfo.RoomID, userName);
                await NotifyRoomInfoAsync(false);
                // Send 'ready' event to the host
                await Clients.Caller.SendAsync("ready");
            }
            else
            {
                await Clients.Caller.SendAsync("error", "error occurred when creating a new room.");
            }
        }
        public async Task JoinRoom(string roomId, string clientId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
            await Clients.Caller.SendAsync("joined", roomId, clientId);
            await NotifyRoomInfoAsync(false);
        }

        public async Task LeaveRoom(string roomId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
            await Clients.Group(roomId).SendAsync("leave", Context.ConnectionId);
            await NotifyRoomInfoAsync(false);
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