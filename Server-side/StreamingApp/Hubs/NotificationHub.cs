using Microsoft.AspNetCore.SignalR;
using StreamingApp.Models.Entities;

public class NotificationHub : Hub
{
    public async Task SendNotification(string message)
    {
        await Clients.All.SendAsync("ReceiveNotification", message);
    }

    //  public async Task SendNotification(int userId, Notification notification)
    // {
    //     await Clients.User(userId.ToString()).SendAsync("ReceiveNotification", notification);
    // }
}
