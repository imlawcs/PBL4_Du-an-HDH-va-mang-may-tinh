using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.Entities;

namespace StreamingApp.Managers
{
    public class StreamTagManager
    {
        private readonly AppDbContext _context;
        private readonly StreamManager _streamManager;
        private readonly TagManager _tagManager;

        public StreamTagManager(AppDbContext context, StreamManager streamManager, TagManager tagManager)
        {
            _context = context;
            _streamManager = streamManager;
            _tagManager = tagManager;
        }

        public async Task<(bool Succeeded, string[] Errors)> CreateStreamTagAsync(StreamTag StreamTag)
        {
            if(await _streamManager.GetStreamByIdAsync(StreamTag.StreamId) == null)
            {
                return (false, new [] {"Stream not found"});
            }

            if(await _tagManager.GetTagWithId(StreamTag.TagId) == null)
            {
                return (false, new [] {"Tag not found"});
            }

            _context.StreamTags.Add(StreamTag);
            await _context.SaveChangesAsync();
            return (true, new [] {"StreamTag created successfully"});
        }

        public async Task<bool> DeleteStreamTagAsync(int streamId, int TagId)
        {
            var streamTag = await _context.StreamTags.Where(sc => sc.StreamId == streamId && sc.TagId == TagId).FirstOrDefaultAsync();
            if(streamTag == null)
            {
                return false;
            }

            _context.StreamTags.Remove(streamTag);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<StreamTag>> GetAllStreamTagsAsync()
        {
            var streamTags = _context.StreamTags.Include(sc => sc.Stream).Include(sc => sc.Tag);
            return await streamTags.ToListAsync();
        }

        public async Task<(bool Succeeded, string[] Errors, IEnumerable<StreamTag> StreamTags)> GetListStreamTagByIdAsync(int streamId)
        {
            var streamTag = await _context.StreamTags.Where(sc => sc.StreamId == streamId)
            .Include(sc => sc.Stream)
            .Include(sc => sc.Tag) 
            .ToListAsync();
            if (streamTag.Count == 0)
            return (false, new [] {"StreamTag not found"}, Enumerable.Empty<StreamTag>());
            return (true, Array.Empty<string>(), streamTag);
        }
        
        public async Task<StreamTag?> GetStreamTagByIdAsync(int streamId, int TagId)
        {
            var streamTag = await _context.StreamTags.Where(sc => sc.StreamId == streamId && sc.TagId == TagId)
                .Include(sc => sc.Stream)
                .Include(sc => sc.Tag)
                .FirstOrDefaultAsync();
            
            if(streamTag == null)
            {
                return null;
            }
            return streamTag;
        }

        public async Task<(bool Succeeded, string[] Errors)> UpdateStreamTagAsync(int StreamId, int TagId, StreamTag StreamTag)
        {
            if(await _streamManager.GetStreamByIdAsync(StreamTag.StreamId) == null)
            {
                return (false, new [] {"Stream not found"});
            }

            if(await _tagManager.GetTagWithId(TagId) == null)
            {
                return (false, new [] {"Tag not found"});
            }

            if(await _tagManager.GetTagWithId(StreamTag.TagId) == null)
            {
                return (false, new [] {"Tag not found"});
            }

            var streamTag = await _context.StreamTags.Where(sc => sc.StreamId == StreamId && sc.TagId == TagId).FirstOrDefaultAsync();
            if(streamTag == null)
            {
                return (false, new [] {"StreamTag not found"});
            }

            //kiểm tra đã có streamTag có 2 id như chuẩn bị sửa không
            var streamTagCheck = await _context.StreamTags.Where(sc => sc.StreamId == StreamTag.StreamId && sc.TagId == StreamTag.TagId).FirstOrDefaultAsync();
            if(streamTagCheck != null)
            {
                return (false, new [] {"StreamTag already exists"});
            }

            _context.StreamTags.Remove(streamTag);
            _context.StreamTags.Add(StreamTag);
            await _context.SaveChangesAsync();

            return (true, new [] {"StreamTag updated successfully"});
        }

        internal async Task<bool> DeleteListStreamTagAsync(int streamId)
        {
            var streamTag = await _context.StreamTags.Where(sc => sc.StreamId == streamId).ToListAsync();
            if(streamTag.Count == 0)
            {
                return false;
            }
            _context.StreamTags.RemoveRange(streamTag);
            await _context.SaveChangesAsync();
            return true;
        }
        
    }
}