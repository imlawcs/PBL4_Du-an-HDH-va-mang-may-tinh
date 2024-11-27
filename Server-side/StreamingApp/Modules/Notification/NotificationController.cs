using StreamingApp.Models.Entities;
using StreamingApp.Services;
using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.DTOs;
using Microsoft.AspNetCore.SignalR;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationController(INotificationService notificationService, IHubContext<NotificationHub> hubContext)
        {
            _notificationService = notificationService;
            _hubContext = hubContext;
        }

        [HttpPost()]
        public async Task SendNotificationAsync([FromBody] NotiDTO notiDTO)
        {
            try {
                await _notificationService.SendNotificationAsync(notiDTO.UserId, notiDTO.Message, notiDTO.Type);
            }
            catch (Exception ex) {
                throw new Exception(ex.Message);
            }
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

        [HttpPost]
        public async Task<IActionResult> SendNotification(string message)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", message);
            return Ok();
        }
    }
}