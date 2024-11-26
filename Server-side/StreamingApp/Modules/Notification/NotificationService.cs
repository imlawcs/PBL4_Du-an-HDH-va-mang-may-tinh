using StreamingApp.Models.Entities;
using StreamingApp.Managers;

namespace StreamingApp.Services {
    public class NotificationService : INotificationService {
        private readonly NotificationManager _notificationManager;

        public NotificationService(NotificationManager notificationManager) {
            _notificationManager = notificationManager;
        }

        public async Task SendNotificationAsync(int userId, string message, string type) {
            try {
                await _notificationManager.CreateNotificationAsync(userId, message, type);
            }
            catch (Exception ex) {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<Notification>> GetUserNotificationsAsync(string userId) {
            return await _notificationManager.GetUserNotificationsAsync(userId);
        }

        public async Task MarkAsReadAsync(int notificationId) {
            await _notificationManager.MarkAsReadAsync(notificationId);
        }
    }

}