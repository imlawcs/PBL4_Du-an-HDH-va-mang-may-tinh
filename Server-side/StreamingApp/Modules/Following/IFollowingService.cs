using StreamingApp.Models.Entities;

namespace StreamingApp.Services
{
    public interface IFollowingService {
        // Task<Following?> GetFollowingByIdAsync(int followingId);
        Task<Following[]> GetAllFollowings();
        Task<Following[]> GetFollowingByChannelIdAsync(int channelId);
        Task<(bool Succeeded, string[] Errors)> FollowUser(int channelId, int userId);
        Task<(bool Succeeded, string[] Errors)> UnfollowUser(int channelId, int userId);
    }
}