using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;
using StreamingApp.Services;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StreamController : ControllerBase
    {
        private readonly IStreamService _streamService;
        private readonly IStreamCategoryService _streamCategoryService;
        private readonly IStreamTagService _streamTagService;

        public StreamController(IStreamService streamService, IStreamCategoryService streamCategoryService, IStreamTagService streamTagService)
        {
            _streamService = streamService;
            _streamCategoryService = streamCategoryService;
            _streamTagService = streamTagService;
        }
        

        [HttpGet]
        public async Task<IActionResult> GetAllStreamAsync()
        {
            try
            {
                var stream = await _streamService.GetAllStreamsAsync();
                return Ok(stream);
            }
            catch (Exception ex)
            {
                // Log lỗi chi tiết
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetstreamWithIdAsync(int id)
        {
            var stream = await _streamService.GetStreamByIdAsync(id);
            if (stream==null) return NotFound("Stream not found");
            else return Ok(stream);
        }

        [HttpPost]
        public async Task<IActionResult> CreateStreamAsync([FromBody] StreamDTO model)
        {
            var streamModel = model.stream;
            var stream = await _streamService.CreateStreamAsync(streamModel);
            if(!stream.Succeeded)
            {
                //không tạo thành công stream
                return BadRequest(stream.Errors);
            }

            var streamCategory = new StreamCategory { StreamId=streamModel.StreamId ,CategoryId = model.streamCategoryId };
            var streamTag = new StreamTag { StreamId=streamModel.StreamId, TagId = model.streamTagId };

            var newStreamCategory = await _streamCategoryService.CreateStreamCategoryAsync(streamCategory);
            var newStreamTag = await _streamTagService.CreateStreamTagAsync(streamTag);
            
            if(!newStreamCategory.Succeeded)
            {
                //không tạo thành công stream category
                return BadRequest(newStreamCategory.Errors);
            }
            if(!newStreamCategory.Succeeded)
            {
                //không tạo thành công stream category
                return BadRequest("Fail to create stream category. Stream created");
            }
            
            if(!newStreamTag.Succeeded)
            {
                //không tạo thành công stream tag
                return BadRequest("Fail to create stream tag. Stream created");
            }
            return Ok("Create stream successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStreamAsync(int id,Models.Entities.Stream model)
        {
            var stream = await _streamService.GetStreamByIdAsync(id);
            if( stream == null) 
                return NotFound("Stream not found");
                
            if(id!=model.StreamId) 
                return BadRequest("Id is not match");

            var result = await _streamService.UpdateStreamAsync(model);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Update stream successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStreamAsync(int id)
        {
            var result = await _streamService.DeleteStreamAsync(id);
            if (!result)
                return NotFound("Stream not found");

            return Ok("Delete stream successfully");
        }
    }
}