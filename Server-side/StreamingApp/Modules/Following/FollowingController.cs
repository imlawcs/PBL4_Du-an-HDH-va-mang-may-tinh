using StreamingApp.Services;
using StreamingApp.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FollowingController : ControllerBase {
        private readonly FollowingService followingService;

        public FollowingController(FollowingService followingService) {
            this.followingService = followingService;
        }

        [HttpPost("follow")]
        public async Task<IActionResult> FollowUser(int followerId, int channelId) {
            var result = await followingService.FollowUser(followerId, channelId);
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

        [HttpGet]
        public async Task<IActionResult> GetFollowingsByChannelIdAsync(int channelId) {
            var followings = await followingService.GetFollowingByChannelIdAsync(channelId);
            return Ok(followings);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFollowings() {
            var followings = await followingService.GetAllFollowings();
            return Ok(followings);
        }

        [HttpPost("unfollow")]
        public async Task<IActionResult> UnfollowUser(int followerId, int channelId) {
            var result = await followingService.UnfollowUser(followerId, channelId);
            if (result.Succeeded) {
                return Ok();
            }
            return BadRequest(result.Errors);
        }
    }
}