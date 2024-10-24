using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.SignalR;
using StreamingApp.Managers;

namespace StreamingApp.Hubs
{
    [Authorize]
    public class MainHub : Hub
    {
        public static StreamRoomManager streamRoomManager { get; set; }
        public async Task SendMessage(string user, string message)
            => await Clients.All.SendAsync("ReceiveMessage", user, message);


        public async Task Ready()
        => await Clients.All.SendAsync("Ready");
    }
}