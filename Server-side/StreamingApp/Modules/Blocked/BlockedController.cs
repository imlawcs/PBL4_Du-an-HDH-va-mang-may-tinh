using StreamingApp.Services;
using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.DTOs;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlockedController : ControllerBase {
        private readonly IBlockedService _blockedService;
        private readonly IUserService userService;
        private readonly IFollowingService followingService;

        public BlockedController(IBlockedService blockedService, IUserService userService, IFollowingService followingService) {
            _blockedService = blockedService;
            this.userService = userService;
            this.followingService = followingService;
        }

        [HttpGet("{channelId}")]
        public async Task<IActionResult> GetBlockedByChannelId(int channelId)
        {
            var result = await _blockedService.GetBlockedByChannelIdAsync(channelId);
            if(result.Length == 0) {
                return NotFound("Channel has no blocking user");
            }

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlocked()
        {
            var result = await _blockedService.GetAllBlocked();
            if(result.Length == 0) {
                return NotFound("Blocked User not found");
            }

            return Ok(result);
        }
        
        [HttpPost("block")]
        public async Task<IActionResult> BlockUser([FromBody] BlockDTO blockDTO)
        {
            var channelExist = await userService.GetUserByIdAsync(blockDTO.ChannelId);
            var userExist = await userService.GetUserByIdAsync(blockDTO.UserId);
            if(channelExist == null || userExist == null) {
                return NotFound("User not found");
            }

            bool isBlocked = await _blockedService.IsBlocked(blockDTO.ChannelId, blockDTO.UserId);
            if(isBlocked) {
                return BadRequest("User is already blocked");
            }

            var result = await _blockedService.BlockUser(blockDTO.ChannelId, blockDTO.UserId);
            var isFollowing = await followingService.IsFollowing(blockDTO.ChannelId, blockDTO.UserId);
            if(isFollowing) {
                await followingService.UnfollowUser(blockDTO.ChannelId, blockDTO.UserId);
            }

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("Block successfully");
        }

        [HttpPost("unblock")]
        public async Task<IActionResult> UnblockUser([FromBody] BlockDTO blockDTO)
        {
            var channelExist = await userService.GetUserByIdAsync(blockDTO.ChannelId);
            var userExist = await userService.GetUserByIdAsync(blockDTO.UserId);
            if(channelExist == null || userExist == null) {
                return NotFound("User not found");
            }

            bool isBlocked = await _blockedService.IsBlocked(blockDTO.ChannelId, blockDTO.UserId);
            if(!isBlocked) {
                return BadRequest("User is not blocked");
            }
            var result = await _blockedService.UnblockUser(blockDTO.ChannelId, blockDTO.UserId);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("Unblock successfully");
        }
    }
}