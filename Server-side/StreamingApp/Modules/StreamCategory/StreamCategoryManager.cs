using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers
{
    public class StreamCategoryManager
    {
        private readonly AppDbContext _context;
        private readonly StreamManager _streamManager;
        private readonly CategoryManager _categoryManager;

        public StreamCategoryManager(AppDbContext context, StreamManager streamManager, CategoryManager categoryManager)
        {
            _context = context;
            _streamManager = streamManager;
            _categoryManager = categoryManager;
        }

        public async Task<(bool Succeeded, string[] Errors)> CreateStreamCategoryAsync(StreamCategory StreamCategory)
        {
            if(await _streamManager.GetStreamByIdAsync(StreamCategory.StreamId) == null)
            {
                return (false, new [] {"Stream not found"});
            }

            if(await _categoryManager.GetCategoryByIdAsync(StreamCategory.CategoryId) == null)
            {
                return (false, new [] {"Category not found"});
            }

            _context.StreamCategories.Add(StreamCategory);
            await _context.SaveChangesAsync();
            return (true, new [] {"StreamCategory created successfully"});
        }

        public async Task<bool> DeleteStreamCategoryAsync(int streamId, int categoryId)
        {
            var streamCategory = await _context.StreamCategories.FindAsync(streamId, categoryId);
            if(streamCategory == null)
            {
                return false;
            }

            _context.StreamCategories.Remove(streamCategory);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<StreamCategory>> GetAllStreamCategoriesAsync()
        {
            var streamCategories = _context.StreamCategories.Include(sc => sc.Stream).Include(sc => sc.Category);
            return await streamCategories.ToListAsync();
        }

        public async Task<(bool Succeeded, string[] Errors, IEnumerable<StreamCategory> StreamCategories)> GetListStreamCategoryByIdAsync(int streamId)
        {
            var streamCategory = await _context.StreamCategories.Where(sc => sc.StreamId == streamId)
            .Include(sc => sc.Stream)
            .Include(sc => sc.Category) 
            .ToListAsync();
            if (streamCategory.Count == 0)
            return (false, new [] {"StreamCategory not found"}, Enumerable.Empty<StreamCategory>());
            return (true, Array.Empty<string>(), streamCategory);
        }
        
        public async Task<StreamCategory?> GetStreamCategoryByIdAsync(int streamId, int categoryId)
        {
            var streamCategory = await _context.StreamCategories.Where(sc => sc.StreamId == streamId && sc.CategoryId == categoryId)
                .Include(sc => sc.Stream)
                .Include(sc => sc.Category)
                .FirstOrDefaultAsync();
            
            if(streamCategory == null)
            {
                return null;
            }
            return streamCategory;
        }

        public async Task<(bool Succeeded, string[] Errors)> UpdateStreamCategoryAsync(int StreamId, int CategoryId, StreamCategory StreamCategory)
        {
            if(await _streamManager.GetStreamByIdAsync(StreamCategory.StreamId) == null)
            {
                return (false, new [] {"Stream not found"});
            }

            if(await _categoryManager.GetCategoryByIdAsync(StreamCategory.CategoryId) == null)
            {
                return (false, new [] {"Category not found"});
            }

            if(await _categoryManager.GetCategoryByIdAsync(CategoryId) == null)
            {
                return (false, new [] {"Category not found"});
            }

            var streamCategory = await _context.StreamCategories.Where(sc => sc.StreamId == StreamId && sc.CategoryId == CategoryId).FirstOrDefaultAsync();
            if(streamCategory == null)
            {
                return (false, new [] {"StreamCategory not found"});
            }

            //kiểm tra đã có streamcategory có 2 id như chuẩn bị sửa không
            var streamCategoryCheck = await _context.StreamCategories.Where(sc => sc.StreamId == StreamCategory.StreamId && sc.CategoryId == StreamCategory.CategoryId).FirstOrDefaultAsync();
            if(streamCategoryCheck != null)
            {
                return (false, new [] {"StreamCategory already exists"});
            }

            _context.StreamCategories.Remove(streamCategory);
            _context.StreamCategories.Add(StreamCategory);
            await _context.SaveChangesAsync();

            return (true, new [] {"StreamCategory updated successfully"});
        }

        internal async Task<bool> DeleteStreamCategoryAsync(int streamId)
        {
            var streamCategory = await _context.StreamCategories.Where(sc => sc.StreamId == streamId).ToListAsync();
            if(streamCategory.Count == 0)
            {
                return false;
            }
            _context.StreamCategories.RemoveRange(streamCategory);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}