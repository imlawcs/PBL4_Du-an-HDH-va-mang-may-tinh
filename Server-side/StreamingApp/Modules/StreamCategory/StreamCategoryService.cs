using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StreamingApp.Models.Entities;
using StreamingApp.Managers;

namespace StreamingApp.Services
{
    public class StreamCategoryService : IStreamCategoryService
    {
        private readonly StreamCategoryManager streamCategoryManager;

        public StreamCategoryService(StreamCategoryManager streamCategoryManager)
        {
            this.streamCategoryManager = streamCategoryManager;
        }
        public Task<(bool Succeeded, string[] Errors)> CreateStreamCategoryAsync(StreamCategory StreamCategory)
        {
            return streamCategoryManager.CreateStreamCategoryAsync(StreamCategory);
        }

        public Task<bool> DeleteStreamCategoryAsync(int streamId, int categoryId)
        {
            return streamCategoryManager.DeleteStreamCategoryAsync(streamId, categoryId);
        }
        public Task<bool> DeleteListStreamCategoryAsync(int streamId)
        {
            return streamCategoryManager.DeleteStreamCategoryAsync(streamId);
        }


        public Task<IEnumerable<StreamCategory>> GetAllStreamCategorysAsync()
        {
            return streamCategoryManager.GetAllStreamCategoriesAsync();
        }

        public Task<StreamCategory?> GetStreamCategoryByIdAsync(int StreamId, int CategoryId)
        {
            return streamCategoryManager.GetStreamCategoryByIdAsync(StreamId, CategoryId);
        }

        public async Task<(bool Succeeded, string[] Errors, IEnumerable<StreamCategory> StreamCategories)> GetListStreamCategoryByIdAsync(int StreamId)
        {
            var result = await streamCategoryManager.GetListStreamCategoryByIdAsync(StreamId);
            return result;
        }

        public Task<(bool Succeeded, string[] Errors)> UpdateStreamCategoryAsync(int StreamId, int CategoryId,StreamCategory StreamCategory)
        {
            return streamCategoryManager.UpdateStreamCategoryAsync(StreamId, CategoryId, StreamCategory);
        }
    }
}