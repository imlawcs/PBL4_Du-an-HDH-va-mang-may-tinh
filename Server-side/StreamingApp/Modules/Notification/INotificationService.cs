using StreamingApp.Models.Entities;
using StreamingApp.Services;

namespace StreamingApp.Services
{
    public interface INotificationService
    {
        void SendNotification(Notification notification);
    }
}