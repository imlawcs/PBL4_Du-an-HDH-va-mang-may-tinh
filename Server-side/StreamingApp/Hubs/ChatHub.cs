using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace StreamingApp.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string roomId, string clientName, object message)
        {
            string userName = string.IsNullOrEmpty(clientName) ? Context.ConnectionId : clientName;
            Console.WriteLine($"Sending message: {JsonConvert.SerializeObject(message, Formatting.Indented)}");

            if (message is JObject jObject)
            {
                string? messageType = jObject["type"]?.ToString();
                string? targetClient = jObject["target"]?.ToString();

                switch (messageType)
                {
                    case "offer":
                    case "answer":
                    case "candidate":
                        if (!string.IsNullOrEmpty(targetClient))
                        {
                            await Clients.Client(targetClient).SendAsync("message", userName, message);
                        }
                        else
                        {
                            await Clients.OthersInGroup(roomId).SendAsync("message", userName, message);
                        }
                        break;
                    default:
                        await Clients.Group(roomId).SendAsync("message", userName, message);
                        break;
                }
            }
            else
            {
                await Clients.Group(roomId).SendAsync("message", userName, message);
            }
        }
    }
}