using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using StreamingApp.Managers;
using StreamingApp.Models.Entities;

namespace StreamingApp.Hubs
{
    [Authorize]
    public class MainHub : Hub
    {
        public static StreamRoomManager streamRoomManager { get; set; }
        public async Task SendMessage(string user, string message)
            => await Clients.All.SendAsync("SendMessage", user, message);

        public async Task Ready()
        => await Clients.Caller.SendAsync("Ready");

        public async Task CreateRoom(string hostName)
        {
            //dùng connectionId của ng gọi để tạo room -> [HOST]
            var room = streamRoomManager.CreateRoom(hostName, Context.ConnectionId);
            if (room != null)
                //trả về room cho [HOST]
                await Clients.Caller.SendAsync("RoomCreated", JsonConvert.SerializeObject(room));
            else await Clients.Caller.SendAsync("Error", "Error occurred when creating a new room.");
        }
        public async Task JoinRoom(string hostName)
        {
            var room = streamRoomManager.GetRoomByName(hostName);
            StreamRoom streamRoom = (StreamRoom)room;
            if (room != null)
            {
                streamRoomManager.AddJoinerToRoom(
                new StreamJoiner
                {
                    ConnectionId = Context.ConnectionId,
                    Username = "test" + Context.ConnectionId[..5],
                    StreamId = streamRoom.StreamId
                },
                streamRoom.HostConnectionId);
                await Clients.Client(streamRoom.HostConnectionId).SendAsync("RoomJoined", JsonConvert.SerializeObject(room), Context.ConnectionId);
                await Clients.Caller.SendAsync("ClientJoinedRoom", JsonConvert.SerializeObject(room), streamRoom.HostConnectionId); //thông báo về [Client]
            }
            else await Clients.Caller.SendAsync("Error", "Room not found or the streamer is offline.");

        }
        public async Task LeaveRoom(string username,string hostConnectionId)
        {
            var room = streamRoomManager.GetRoomByHostConnectionId(hostConnectionId);
            streamRoomManager.RemoveJoinerFromRoom(hostConnectionId, Context.ConnectionId);
            await Clients.Client(hostConnectionId).SendAsync("RoomLeft", JsonConvert.SerializeObject(room), Context.ConnectionId);
        }
        public async Task SendOffer(string offer, string ClientConnectionId)
        {
            //send offer tới client
            await Clients.Client(ClientConnectionId).SendAsync("ReceiveOffer", offer);
        }
        public async Task SendAnswer(string answer, string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("ReceiveAnswer", answer, Context.ConnectionId);
        }
        public async Task SendIceCandidate(string candidate, string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("ReceiveIceCandidate", candidate);
        }

        public async Task DoneAnswer(string ClientConnectionId)
        {
            await Clients.Caller.SendAsync("StartIceCandidate", ClientConnectionId);
        }
    }
}