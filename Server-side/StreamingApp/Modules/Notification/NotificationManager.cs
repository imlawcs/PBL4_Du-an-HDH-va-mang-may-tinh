using StreamingApp.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace StreamingApp.Managers
{
    public class NotificationManager {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;
        public NotificationManager(AppDbContext context, IEmailService emailService) {
            _context = context;
            _emailService = emailService;
        }

        public async Task CreateNotificationAsync(int userId, string message, string type)
        {
            // 1. Tạo thông báo mới
            var notification = new Notification
            {
                UserId = userId,
                Message = message,
                Type = type,
                NotiDate = DateTime.UtcNow,
                IsRead = false
            };

            // 2. Lưu vào database
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            // 3. Gửi email bất đồng bộ
            await _emailService.SendEmailAsync(userId, "Thông báo mới", message);

            // 4. Gửi thông báo realtime qua SignalR
            // await _hubContext.Clients.User(userId).SendAsync("ReceiveNotification", notification);
        }

        public async Task<List<Notification>> GetUserNotificationsAsync(string userId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == int.Parse(userId))
                .OrderByDescending(n => n.NotiDate)
                .ToListAsync();
        }

        public async Task MarkAsReadAsync(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification != null)
            {
                notification.IsRead = true;
                await _context.SaveChangesAsync();
            }
        }
    }
}