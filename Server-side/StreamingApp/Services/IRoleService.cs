using StreamingApp.Models.Entities;

public interface IRoleService
{
    Task<(bool Succeeded, string[] Errors)> AssignChannelModAsync(string channelId, string userId);
    Task<(bool Succeeded, string[] Errors)> RemoveChannelModAsync(string channelId, string userId);
    Task<IEnumerable<Moderator>> GetChannelModAsync(string channelId);
    Task<(bool Succeeded, string[] Errors)> IsChannelModAsync(string channelId, string userId);
}