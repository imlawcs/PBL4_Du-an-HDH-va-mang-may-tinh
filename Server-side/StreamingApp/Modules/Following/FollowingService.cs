using StreamingApp.Models.Entities;
using StreamingApp.Managers;

namespace StreamingApp.Services {
    public class FollowingService {
        private readonly FollowingManager followingManager;

        public FollowingService(FollowingManager followingManager) {
            this.followingManager = followingManager ?? throw new ArgumentNullException(nameof(followingManager));
        }

        public Task<(bool Succeeded, string[] Errors)> FollowUser(int followerId, int channelId) {
            return followingManager.FollowUser(followerId, channelId);
        }

        public Task<Following[]> GetFollowingsByFollowerIdAsync(int followerId) {
            return followingManager.GetFollowingsByFollowerIdAsync(followerId);
        }

        public Task<Following[]> GetFollowingsByChannelIdAsync(int channelId) {
            return followingManager.GetFollowingsByChannelIdAsync(channelId);
        }

        public Task<Following[]> GetAllFollowings() {
            return followingManager.GetAllFollowings();
        }

        public Task<(bool Succeeded, string[] Errors)> UnfollowUser(int followerId, int channelId) {
            return followingManager.UnfollowUser(followerId, channelId);
        }
    }
}