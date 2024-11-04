using Microsoft.AspNetCore.Identity;
using StreamingApp.Models.Entities;
using StreamingApp.Managers;
using StreamingApp.Services;

public class ModService : IModService
{
    private readonly ModManager ModManager;

    public ModService(ModManager modManager)
    {
        ModManager = modManager ?? throw new ArgumentNullException(nameof(modManager));
    }

    public Task<(bool Succeeded, string[] Errors)> AssignChannelModAsync(int channelId, int userId)
    {
        return ModManager.AssignChannelModAsync(channelId, userId);
    }

    public Task<IEnumerable<User>> GetChannelModAsync(int channelId)
    {
        return ModManager.GetChannelModAsync(channelId);
    }

    public Task<(bool Succeeded, string[] Errors)> IsChannelModAsync(int channelId, int userId)
    {
        return ModManager.IsChannelModAsync(channelId, userId);
    }

    public Task<(bool Succeeded, string[] Errors)> RemoveChannelModAsync(int channelId, int userId)
    {
        return ModManager.RemoveChannelModAsync(channelId, userId);
    }
}