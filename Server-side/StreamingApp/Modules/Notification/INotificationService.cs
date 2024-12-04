using StreamingApp.Models.Entities;
using StreamingApp.Services;

namespace StreamingApp.Services
{
    public interface INotificationService
    {
        Task SendNotificationAsync(int userId, string message, string type);
        Task<List<Notification>> GetUserNotificationsAsync(string userId);
        Task MarkAsReadAsync(int notificationId);
    }
}