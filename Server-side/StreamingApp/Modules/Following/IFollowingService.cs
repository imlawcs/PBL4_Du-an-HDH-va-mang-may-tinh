using StreamingApp.Models.Entities;

namespace StreamingApp.Services
{
    public interface IFollowingService {
        Task<Following[]> GetAllFollowings();
        Task<Following[]> GetFollowingByChannelIdAsync(int channelId);
        Task<(bool Succeeded, string[] Errors)> FollowUser(int channelId, int followerId);
        Task<(bool Succeeded, string[] Errors)> UnfollowUser(int channelId, int followerId);
        Task<bool> IsFollowing(int channelId, int followerId);
    }
}