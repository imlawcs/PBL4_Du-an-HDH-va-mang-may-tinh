using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using StreamingApp.Managers;
using StreamingApp.Models.Entities;

namespace StreamingApp.Hubs
{
    public class MainHub : Hub
    {
        public static StreamRoomManager streamRoomManager { get; set; }

        public MainHub()
        {
            streamRoomManager = new StreamRoomManager();
        }

        public override Task OnConnectedAsync()
        {
            //global connection check
            Console.WriteLine("Client connected: " + Context.ConnectionId);

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            //global disconection check
            Console.WriteLine("Client disconnected: " + Context.ConnectionId);
            var remove = streamRoomManager.RemoveConnection(Context.ConnectionId);
            if (remove is StreamRoom room)
            {
                Clients.Client(room.HostConnectionId).SendAsync("RoomRemove", Context.ConnectionId);
            }
            else if (remove is string host)
            {
                Groups.RemoveFromGroupAsync(Context.ConnectionId, host);
                Clients.Client(host).SendAsync("RoomLeft", Context.ConnectionId);
                Clients.Client(Context.ConnectionId).SendAsync("DisposeClient", host);

            }
            else if (remove is null)
            {
                Console.WriteLine("Room not found cuz room is null");
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string user, string message, string hostConnectionId)
            => await Clients.Group(hostConnectionId).SendAsync("SendMessage", user, message);

        public async Task Ready()
        => await Clients.Caller.SendAsync("Ready");

        public async Task CreateRoom(string hostName)
        {
            //dùng connectionId của ng gọi để tạo room -> [HOST]
            var room = streamRoomManager.CreateRoom(hostName, Context.ConnectionId);
            if (room != null)
            {
                //trả về room cho [HOST]
                await Clients.Caller.SendAsync("RoomCreated", JsonConvert.SerializeObject(room));
                await Groups.AddToGroupAsync(Context.ConnectionId, Context.ConnectionId);
            }

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
                await Groups.AddToGroupAsync(Context.ConnectionId, room.HostConnectionId);
                await Clients.Client(room.HostConnectionId).SendAsync("RoomJoined", JsonConvert.SerializeObject(add), Context.ConnectionId);
                await Clients.Caller.SendAsync("ClientJoinedRoom", JsonConvert.SerializeObject(room), room.HostConnectionId); //thông báo về [Client]
            }
            else await Clients.Caller.SendAsync("Error", "Room not found or the streamer is offline.");

        }
        [ObsoleteAttribute("this function doesn\'t work anymore", false)]
        public async Task LeaveRoom(string hostConnectionId)
        {

            var room = streamRoomManager.RemoveJoinerFromRoom(hostConnectionId, Context.ConnectionId);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, hostConnectionId);
            await Clients.Client(hostConnectionId).SendAsync("RoomLeft", JsonConvert.SerializeObject(room), Context.ConnectionId);
        }
        public async Task RemoveRoom()
        {
            var room = streamRoomManager.RemoveConnection(Context.ConnectionId);
            Console.WriteLine("Room removed: " + JsonConvert.SerializeObject(room));
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, Context.ConnectionId);
            await Clients.Caller.SendAsync("RoomRemoved", JsonConvert.SerializeObject(room), Context.ConnectionId);
        }
        //current issue
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
        public async Task SendIceCandidate(object candidate, string connectionId, string type)
        {
            await Clients.Client(connectionId).SendAsync("ReceiveIceCandidate", candidate, Context.ConnectionId, type);
        }

        public async Task DoneAnswer(string ClientConnectionId)
        {
            await Clients.Clients(ClientConnectionId, Context.ConnectionId).SendAsync("DoneAnswer");
        }
    }
}