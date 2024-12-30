using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.DTOs;
using StreamingApp.Services;

namespace StreamingApp.Managers
{
    public class StreamManager
    {
        private readonly AppDbContext _context;
        private readonly UserManager _userManager;
        private readonly IFileService _fileService;

        public StreamManager(AppDbContext context, UserManager userManager, IFileService fileService) {
            _context = context;
            _userManager = userManager;
            _fileService = fileService;
        }

        private bool IsValidImage(IFormFile file)
        {
            if (file.Length > 5 * 1024 * 1024) // 5MB limit
                return false;

            var allowedTypes = new[] { "image/jpeg", "image/jpg", "image/png", "image/gif" };
            return allowedTypes.Contains(file.ContentType.ToLower());
        }

        public async Task<Models.Entities.Stream?> GetStreamByIdAsync(int id) {
            return await _context.Streams.Include(s => s.User)
            .Include(s => s.StreamTags)
            .Include(s => s.StreamCategories)
            .FirstOrDefaultAsync(s => s.StreamId == id);
        }


        public async Task<IEnumerable<Models.Entities.Stream>> GetAllStreamsAsync() {
            return await _context.Streams.Include(s => s.User)
            .Include(s => s.StreamTags)
            .Include(s => s.StreamCategories)
            .ToListAsync();
        }

        public async Task<bool> DeleteStreamAsync(int id) {
            var stream = await _context.Streams.FindAsync(id);
            if (stream == null) {
                return false;
            }

            _context.Streams.Remove(stream);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<(bool Succeeded, string[] Errors, Models.Entities.Stream? Stream)> CreateStreamAsync(Models.Entities.Stream stream) {
            var user = await _userManager.GetUserById(stream.UserId);
            if (user == null) {
                return (false, new []{"User not found"}, null);
            }

            _context.Streams.Add(stream);
            await _context.SaveChangesAsync();
            return (true, new []{"Create stream successfully"}, stream);
        }

        public async Task<(bool Succeeded, string[] Errors)> UpdateStreamAsync(Models.Entities.Stream stream) {
            var streamToUpdate = await _context.Streams.FindAsync(stream.StreamId);
            if (streamToUpdate == null) {
                return (false, new []{"Stream not found"});
            }

            streamToUpdate.StreamTitle = stream.StreamTitle;
            streamToUpdate.StreamDesc= stream.StreamDesc;
            streamToUpdate.IsLive = stream.IsLive;
            streamToUpdate.StreamStatus = stream.StreamStatus;

            await _context.SaveChangesAsync();
            return (true, new [] {"Update stream successfully"});
        }

        internal async Task<(bool Succeeded, string[] Errors)> UpdateImageStreamAsync(int id, StreamUpdateImageDTO model)
        {
            var stream = await _context.Streams.FindAsync(id);
            if (stream == null) {
                return (false, new []{"Stream not found"});
            }

            if(model.ImagePath != null)
            {
                if (!IsValidImage(model.ImagePath))
                    return (false, new[] { "Invalid image format" });

                try
                {
                    stream.StreamThumbnail = await _fileService.SaveFileAsync(model.ImagePath);
                }
                catch (Exception)
                {
                    return (false, new[] { "Error uploading Stream Thumbnail" });
                }
            }

            await _context.SaveChangesAsync();
            return (true, new [] {"Update Stream Thumbnail successfully"});
        }
    }
}