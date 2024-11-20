using StreamingApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlockedController : ControllerBase {
        private readonly IBlockedService _blockedService;

        public BlockedController(IBlockedService blockedService)
        {
            _blockedService = blockedService;
        }

        [HttpGet("{channelId}")]
        public async Task<IActionResult> GetBlockedByChannelId(int channelId)
        {
            var result = await _blockedService.GetBlockedByChannelIdAsync(channelId);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlocked()
        {
            var result = await _blockedService.GetAllBlocked();

            return Ok(result);
        }

        [HttpGet("blocked/{blockedId}")]
        public async Task<IActionResult> GetBlockedById(int blockedId)
        {
            var result = await _blockedService.GetBlockedByIdAsync(blockedId);

            return Ok(result);
        }

        [HttpPost("unblock")]
        public async Task<IActionResult> UnblockUser(int channelId, int userId)
        {
            var result = await _blockedService.UnblockUser(channelId, userId);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        [HttpPost("block")]
        public async Task<IActionResult> BlockUser(int channelId, int userId)
        {
            var result = await _blockedService.BlockUser(channelId, userId);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }
    }
}