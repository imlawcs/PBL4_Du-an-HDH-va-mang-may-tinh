using StreamingApp.Models.Entities;
using StreamingApp.Managers;

namespace StreamingApp.Services {
    public class NotificationService : INotificationService {
        private readonly NotificationManager _notificationManager;

        public NotificationService(NotificationManager notificationManager) {
            _notificationManager = notificationManager;
        }

        public void SendNotification(Notification notification) {
            _notificationManager.SendNotification(notification);
        }
    }
}