using StreamingApp.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace StreamingApp.Managers
{
    public class FollowingManager {
        private readonly AppDbContext dbContext;

        public FollowingManager(AppDbContext dbContext) {
            this.dbContext = dbContext;
        }

        public async Task<Following[]> GetFollowingsByChannelIdAsync(int channelId) {
            return await dbContext.Followings
                .Where(f => f.ChannelId == channelId)
                .ToArrayAsync();
        }

        public async Task<Following[]> GetAllFollowings() {
            return await dbContext.Followings.ToArrayAsync();
        }

        public async Task<(bool Succeeded, string[] Errors)> FollowUser(int followerId, int channelId) {
            var following = new Following {
                FollowerId = followerId,
                ChannelId = channelId
            };

            await dbContext.Followings.AddAsync(following);
            await dbContext.SaveChangesAsync();

            return (true, Array.Empty<string>());
        }

        public async Task<(bool Succeeded, string[] Errors)> UnfollowUser(int followerId, int channelId) {
            var following = await dbContext.Followings
                .Where(f => f.FollowerId == followerId && f.ChannelId == channelId)
                .FirstOrDefaultAsync();

            if (following == null) {
                return (false, new string[] { "Following not found" });
            }

            dbContext.Followings.Remove(following);
            await dbContext.SaveChangesAsync();

            return (true, Array.Empty<string>());
        }

        public async Task<bool> IsFollowing(int followerId, int channelId) {
            return await dbContext.Followings
                .AnyAsync(f => f.FollowerId == followerId && f.ChannelId == channelId);
        }
    }
}