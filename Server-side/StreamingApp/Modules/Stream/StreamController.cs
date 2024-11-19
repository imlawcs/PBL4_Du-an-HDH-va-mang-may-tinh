using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.DTOs;
using StreamingApp.Services;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StreamController : ControllerBase
    {
        private readonly IStreamService _streamService;

        public StreamController(IStreamService streamService)
        {
            _streamService = streamService;
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
        public async Task<IActionResult> CreateStreamAsync([FromBody] Models.Entities.Stream model)
        {
            var stream = await _streamService.CreateStreamAsync(model);

            if(!stream.Succeeded)
            {
                return BadRequest(stream.Errors);
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