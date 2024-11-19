using StreamingApp.Models.Entities;
using StreamingApp.Managers;

namespace StreamingApp.Services
{
    public class BlockedService : IBlockedService
    {
        private readonly BlockedManager blockedManager;

        public BlockedService(BlockedManager blockedManager)
        {
            this.blockedManager = blockedManager ?? throw new ArgumentNullException(nameof(blockedManager));
        }

        public Task<(bool Succeeded, string[] Errors)> BlockUser(int channelId, int userId)
        {
            return blockedManager.BlockUser(channelId, userId);
        }

        public Task<Blocked[]> GetBlockedByChannelIdAsync(int channelId)
        {
            return blockedManager.GetBlockedByChannelIdAsync(channelId);
        }

        public Task<Blocked[]> GetAllBlocked()
        {
            return blockedManager.GetAllBlocked();
        }

        public Task<Blocked?> GetBlockedByIdAsync(int blockedId)
        {
            return blockedManager.GetBlockedByIdAsync(blockedId);
        }

        public Task<(bool Succeeded, string[] Errors)> UnblockUser(int channelId, int userId)
        {
            return blockedManager.UnblockUser(channelId, userId);
        }
    }
    
}