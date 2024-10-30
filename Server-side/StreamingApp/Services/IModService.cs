using StreamingApp.Models.Entities;

namespace StreamingApp.Services{
    public interface IModService
    {
        Task<(bool Succeeded, string[] Errors)> AssignChannelModAsync(int channelId, int userId);
        Task<(bool Succeeded, string[] Errors)> RemoveChannelModAsync(int channelId, int userId);
        Task<IEnumerable<User>> GetChannelModAsync(int channelId);
        Task<(bool Succeeded, string[] Errors)> IsChannelModAsync(int channelId, int userId);

    }
}