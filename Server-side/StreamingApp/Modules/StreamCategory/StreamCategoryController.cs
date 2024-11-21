using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.Entities;
using StreamingApp.Services;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StreamCategoryController : ControllerBase
    {
        private readonly IStreamCategoryService _streamCategoryService;
        
        public StreamCategoryController(IStreamCategoryService streamCategoryService)
        {
            _streamCategoryService = streamCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStreamCategoryAsync()
        {
            try
            {
                var StreamCategorys = await _streamCategoryService.GetAllStreamCategorysAsync();
                return Ok(StreamCategorys);
            }
            catch (Exception ex)
            {
                // Log lỗi chi tiết
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("stream/{streamId}/category/{categoryId}")] 
        public async Task<IActionResult> GetStreamCategoryWithIdAsync(int streamId, int categoryId)
        {
            var StreamCategory = await _streamCategoryService.GetStreamCategoryByIdAsync(streamId, categoryId);
            if (StreamCategory==null) return NotFound("StreamCategory not found");
            else return Ok(StreamCategory);
        }

        [HttpGet("{streamId}")] 
        public async Task<IActionResult> GetListStreamCategoryWithIdAsync(int streamId)
        {
            var StreamCategory = await _streamCategoryService.GetListStreamCategoryByIdAsync(streamId);
            
            if(!StreamCategory.Succeeded) return BadRequest(StreamCategory.Errors);
            else return Ok(StreamCategory.StreamCategories);
        }

        [HttpPost]
        public async Task<IActionResult> CreateStreamCategoryAsync([FromBody] StreamCategory model)
        {
            var StreamCategory = await _streamCategoryService.CreateStreamCategoryAsync(model);
            if(!StreamCategory.Succeeded)
            {
                return BadRequest(StreamCategory.Errors);
            }
            return Ok("Create StreamCategory successfully");
        }
        
        [HttpPut("{streamId}/{categoryId}")]
        public async Task<IActionResult> UpdateStreamCategoryAsync(int streamId, int categoryId ,StreamCategory model)
        {
            if(streamId!=model.StreamId) 
                return BadRequest("Id is not match");

            var result = await _streamCategoryService.UpdateStreamCategoryAsync(streamId, categoryId, model);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Update StreamCategory successfully");
        }

        [HttpDelete("{streamId}/{categoryId}")]
        public async Task<IActionResult> DeleteStreamCategoryAsync(int streamId, int categoryId)
        {
            var result = await _streamCategoryService.DeleteStreamCategoryAsync(streamId, categoryId);
            if (!result)
                return NotFound("StreamCategory not found");

            return Ok("Delete StreamCategory successfully");
        }

        [HttpDelete("{streamId}")]
        public async Task<IActionResult> DeleteListStreamCategoryAsync(int streamId)
        {
            var result = await _streamCategoryService.DeleteListStreamCategoryAsync(streamId);
            if (!result)
                return NotFound("StreamCategory not found");

            return Ok("Delete StreamCategory successfully");
        }
    }
}