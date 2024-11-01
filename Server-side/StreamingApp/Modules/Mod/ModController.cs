using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.DTOs;
using StreamingApp.Services;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModController : ControllerBase
    {
        private readonly IModService _modService;

        public ModController(IModService _modService)
        {
            this._modService = _modService;
        }

        [HttpPost("assign")]
        public async Task<IActionResult> AssignChannelModAsync([FromBody] ModDto ModDto)
        {
            
            var result = await _modService.AssignChannelModAsync(ModDto.channelId, ModDto.userId);
            if (result.Succeeded)
            {
                return Ok(result.Errors);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("remove")]
        public async Task<IActionResult> RemoveChannelModAsync([FromBody] ModDto ModDto)
        {
            var result = await _modService.RemoveChannelModAsync(ModDto.channelId, ModDto.userId);
            if (result.Succeeded)
            {
                return Ok(result.Errors);
            }
            return BadRequest(result.Errors);
        }

        [HttpGet("{channelId}")]
        public async Task<IActionResult> GetChannelModAsync(int channelId)
        {
            Console.WriteLine("GetChannelModAsync: " + channelId);
            var result = await _modService.GetChannelModAsync(channelId);
            if (result  == null)
                return NotFound();
            return Ok(result);
        }

        [HttpGet("is")]
        public async Task<IActionResult> IsChannelModAsync([FromBody] ModDto ModDto)
        {
            var result = await _modService.IsChannelModAsync(ModDto.channelId, ModDto.userId);
            return Ok(result.Errors);
        }
    }
}
