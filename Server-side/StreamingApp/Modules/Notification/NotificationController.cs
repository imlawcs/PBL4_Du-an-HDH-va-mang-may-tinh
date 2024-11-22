using StreamingApp.Models.Entities;
using StreamingApp.Services;
using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.DTOs;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpPost()]
        public async Task SendNotificationAsync([FromBody] NotiDTO notiDTO)
        {
            await _notificationService.SendNotificationAsync(notiDTO.UserId, notiDTO.Message, notiDTO.Type);
        }

        [HttpGet("{userId}")]
        public async Task<List<Notification>> GetUserNotificationsAsync(string userId)
        {
            return await _notificationService.GetUserNotificationsAsync(userId);
        }

        [HttpPut("{notificationId}")]
        public async Task MarkAsReadAsync(int notificationId)
        {
            await _notificationService.MarkAsReadAsync(notificationId);
        }
    }
}