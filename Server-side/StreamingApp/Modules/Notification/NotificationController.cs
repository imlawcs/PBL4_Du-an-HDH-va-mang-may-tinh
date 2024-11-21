using StreamingApp.Models.Entities;
using StreamingApp.Services;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        public void SendNotification(Notification notification)
        {
            _notificationService.SendNotification(notification);
        }
    }
}