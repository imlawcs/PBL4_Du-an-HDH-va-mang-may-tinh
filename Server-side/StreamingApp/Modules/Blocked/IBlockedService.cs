using StreamingApp.Models.Entities;

namespace StreamingApp.Services
{
    public interface IBlockedService
    {
        Task<Blocked?> GetBlockedByIdAsync(int blockedId);
        Task<Blocked[]> GetAllBlocked();
        // Task<Blocked[]> GetBlockedByUserIdAsync(int userId);
        Task<Blocked[]> GetBlockedByChannelIdAsync(int channelId);
        Task<(bool Succeeded, string[] Errors)> BlockUser(int channelId, int userId);
        Task<(bool Succeeded, string[] Errors)> UnblockUser(int channelId, int userId);
    }
}