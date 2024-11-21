using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;
using StreamingApp.Managers;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Data.SqlClient;

namespace StreamingApp.Services
{
    public class StreamService : IStreamService
    {
        private readonly StreamManager StreamManager;

        public StreamService(StreamManager streamManager)
        {
            StreamManager = streamManager ?? throw new ArgumentNullException(nameof(streamManager));
        }

        public Task<(bool Succeeded, string[] Errors, Models.Entities.Stream? Stream)> CreateStreamAsync(Models.Entities.Stream stream)
        {
            return StreamManager.CreateStreamAsync(stream);
        }

        public Task<bool> DeleteStreamAsync(int id)
        {
            return StreamManager.DeleteStreamAsync(id);
        }

        public Task<IEnumerable<Models.Entities.Stream>> GetAllStreamsAsync()
        {
            return StreamManager.GetAllStreamsAsync();
        }

        public Task<Models.Entities.Stream?> GetStreamByIdAsync(int id)
        {
            return StreamManager.GetStreamByIdAsync(id);
        }

        public Task<(bool Succeeded, string[] Errors)> UpdateStreamAsync(Models.Entities.Stream stream)
        {
            return StreamManager.UpdateStreamAsync(stream);
        }
    }
}