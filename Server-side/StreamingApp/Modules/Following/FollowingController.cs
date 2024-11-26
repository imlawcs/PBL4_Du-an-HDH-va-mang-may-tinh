using StreamingApp.Services;
using StreamingApp.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.DTOs;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FollowingController : ControllerBase {
        private readonly IFollowingService _followingService;

        public FollowingController(IFollowingService followingService)
        {
            _followingService = followingService;
        }

        [HttpPost("follow")]
        public async Task<IActionResult> FollowUser([FromBody] FollowDTO followDTO) {
            var result = await _followingService.FollowUser(followDTO.FollowerId, followDTO.ChannelId);
            if (result.Succeeded) {
                return Ok();
            }
            return BadRequest(result.Errors);
        }

        // [HttpGet]
        // public async Task<IActionResult> GetFollowingsByFollowerIdAsync(int followerId) {
        //     var followings = await followingService.GetFollowingsByFollowerIdAsync(followerId);
        //     return Ok(followings);
        // }

        [HttpGet("{channelId}")]
        public async Task<IActionResult> GetFollowingsByChannelIdAsync(int channelId) {
            var followings = await _followingService.GetFollowingByChannelIdAsync(channelId);
            return Ok(followings);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFollowings() {
            var followings = await _followingService.GetAllFollowings();
            return Ok(followings);
        }

        [HttpPost("unfollow")]
        public async Task<IActionResult> UnfollowUser([FromBody] FollowDTO followDTO) {
            var result = await _followingService.UnfollowUser(followDTO.FollowerId, followDTO.ChannelId);
            if (result.Succeeded) {
                return Ok();
            }
            return BadRequest(result.Errors);
        }
    }
}