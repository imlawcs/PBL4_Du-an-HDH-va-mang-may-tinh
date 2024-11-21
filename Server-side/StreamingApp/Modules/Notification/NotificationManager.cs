using StreamingApp.Models.Entities;

namespace StreamingApp.Managers
{
    public class NotificationManager {
        private readonly AppDbContext _context;

        public NotificationManager(AppDbContext context) {
            _context = context;
        }

        public void SendNotification(Notification notification) {
            _context.Notifications.Add(notification);
            _context.SaveChanges();
        }
    }
}