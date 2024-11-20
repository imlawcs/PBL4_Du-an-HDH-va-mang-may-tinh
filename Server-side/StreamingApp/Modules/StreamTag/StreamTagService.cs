using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StreamingApp.Models.Entities;
using StreamingApp.Managers;

namespace StreamingApp.Services
{
    public class StreamTagService : IStreamTagService
    {
        private readonly StreamTagManager StreamTagManager;

        public StreamTagService(StreamTagManager StreamTagManager)
        {
            this.StreamTagManager = StreamTagManager;
        }
        public Task<(bool Succeeded, string[] Errors)> CreateStreamTagAsync(StreamTag StreamTag)
        {
            return StreamTagManager.CreateStreamTagAsync(StreamTag);
        }

        public Task<bool> DeleteListStreamTagAsync(int streamId)
        {
            return StreamTagManager.DeleteListStreamTagAsync(streamId);
        }

        public Task<bool> DeleteStreamTagAsync(int streamId, int categoryId)
        {
            return StreamTagManager.DeleteStreamTagAsync(streamId, categoryId);
        }

        public Task<IEnumerable<StreamTag>> GetAllStreamTagsAsync()
        {
            return StreamTagManager.GetAllStreamTagsAsync();
        }

        public Task<(bool Succeeded, string[] Errors, IEnumerable<StreamTag> StreamCategories)> GetListStreamTagByIdAsync(int StreamId)
        {
            return StreamTagManager.GetListStreamTagByIdAsync(StreamId);
        }

        public Task<StreamTag?> GetStreamTagByIdAsync(int StreamId, int CategoryId)
        {
            return StreamTagManager.GetStreamTagByIdAsync(StreamId, CategoryId);
        }

        public Task<(bool Succeeded, string[] Errors)> UpdateStreamTagAsync(int StreamId, int TagId, StreamTag StreamTag)
        {
            return StreamTagManager.UpdateStreamTagAsync(StreamId, TagId, StreamTag);
        }
    }
}