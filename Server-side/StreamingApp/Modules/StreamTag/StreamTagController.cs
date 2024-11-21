using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StreamingApp.Services;
using StreamingApp.Models.Entities;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StreamTagController : ControllerBase
    {
        private readonly IStreamTagService _streamTagService;
        
        public StreamTagController(IStreamTagService streamTagService)
        {
            _streamTagService = streamTagService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStreamTagAsync()
        {
            try
            {
                var StreamTags = await _streamTagService.GetAllStreamTagsAsync();
                return Ok(StreamTags);
            }
            catch (Exception ex)
            {
                // Log lỗi chi tiết
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("stream/{streamId}/tag/{TagId}")] 
        public async Task<IActionResult> GetStreamTagWithIdAsync(int streamId, int TagId)
        {
            var StreamTag = await _streamTagService.GetStreamTagByIdAsync(streamId, TagId);
            if (StreamTag==null) return NotFound("StreamTag not found");
            else return Ok(StreamTag);
        }

        [HttpGet("{streamId}")] 
        public async Task<IActionResult> GetListStreamTagWithIdAsync(int streamId)
        {
            var StreamTag = await _streamTagService.GetListStreamTagByIdAsync(streamId);
            
            if(!StreamTag.Succeeded) return BadRequest(StreamTag.Errors);
            else return Ok(StreamTag.StreamCategories);
        }

        [HttpPost]
        public async Task<IActionResult> CreateStreamTagAsync([FromBody] StreamTag model)
        {
            var StreamTag = await _streamTagService.CreateStreamTagAsync(model);
            if(!StreamTag.Succeeded)
            {
                return BadRequest(StreamTag.Errors);
            }
            return Ok("Create StreamTag successfully");
        }
        
        [HttpPut("{streamId}/{TagId}")]
        public async Task<IActionResult> UpdateStreamTagAsync(int streamId, int TagId ,StreamTag model)
        {
            if(streamId!=model.StreamId) 
                return BadRequest("Id is not match");

            var result = await _streamTagService.UpdateStreamTagAsync(streamId, TagId, model);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Update StreamTag successfully");
        }

        [HttpDelete("{streamId}/{TagId}")]
        public async Task<IActionResult> DeleteStreamTagAsync(int streamId, int TagId)
        {
            var result = await _streamTagService.DeleteStreamTagAsync(streamId, TagId);
            if (!result)
                return NotFound("StreamTag not found");

            return Ok("Delete StreamTag successfully");
        }

        [HttpDelete("{streamId}")]
        public async Task<IActionResult> DeleteListStreamTagAsync(int streamId)
        {
            var result = await _streamTagService.DeleteListStreamTagAsync(streamId);
            if (!result)
                return NotFound("StreamTag not found");

            return Ok("Delete StreamTag successfully");
        }
    }
}