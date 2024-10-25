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

        public MainHub()
        {
            streamRoomManager = new StreamRoomManager();
        }
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
        public async Task JoinRoom(string username, string hostName)
        {
            Console.WriteLine("hostName: " + hostName + " username: " + username);
            var room = streamRoomManager.GetRoomByName(hostName);
            Console.WriteLine("hostRoom: " + room);
            if (room != null)
            {
                StreamJoiner streamJoiner = new()
                {
                    ConnectionId = Context.ConnectionId,
                    Username = !string.IsNullOrEmpty(username) ? username : "test" + Context.ConnectionId[..9],
                    StreamId = room.StreamId
                };
                var add = streamRoomManager.AddJoinerToRoom(streamJoiner, room.HostConnectionId);
                await Clients.Client(room.HostConnectionId).SendAsync("RoomJoined", JsonConvert.SerializeObject(add), Context.ConnectionId);
                await Clients.Caller.SendAsync("ClientJoinedRoom", JsonConvert.SerializeObject(room), room.HostConnectionId); //thông báo về [Client]
            }
            else await Clients.Caller.SendAsync("Error", "Room not found or the streamer is offline.");

        }
        public async Task LeaveRoom(string username, string hostConnectionId)
        {

            var room = streamRoomManager.RemoveJoinerFromRoom(hostConnectionId, Context.ConnectionId);
            await Clients.Client(hostConnectionId).SendAsync("RoomLeft", JsonConvert.SerializeObject(room), Context.ConnectionId);
        }
        public async Task SendOffer(object offer, string ClientConnectionId)
        {
            //send offer tới client
            try
            {
                // Log the parameters
                Console.WriteLine($"SendOffer called with offer: {JsonConvert.SerializeObject(offer)}, ClientConnectionId: {ClientConnectionId}");

                // Send offer to client
                await Clients.Client(ClientConnectionId).SendAsync("ReceiveOffer", offer);
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in SendOffer: {ex.Message}");
                throw;
            }
        }
        public async Task SendAnswer(object answer, string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("ReceiveAnswer", answer, Context.ConnectionId);
        }
        public async Task SendIceCandidate(object candidate, string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("ReceiveIceCandidate", candidate);
        }

        public async Task DoneAnswer(string ClientConnectionId)
        {
            await Clients.Caller.SendAsync("StartIceCandidate", ClientConnectionId);
        }
    }
}