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
        private readonly IUserService userService;

        public FollowingController(IFollowingService followingService, IUserService userService)
        {
            _followingService = followingService;
            this.userService = userService;
        }

        [HttpGet("{channelId}")]
        public async Task<IActionResult> GetFollowingsByChannelIdAsync(int channelId) {
            var followings = await _followingService.GetFollowingByChannelIdAsync(channelId);
            if(followings.Length == 0) {
                return NotFound("Channel has no following");
            }
            return Ok(followings);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFollowings() {
            var followings = await _followingService.GetAllFollowings();
            if(followings.Length == 0) {
                return NotFound("Followings not found");
            }
            return Ok(followings);
        }

        [HttpPost("follow")]
        public async Task<IActionResult> FollowUser([FromBody] FollowDTO followDTO) {
            var followerExist = await userService.GetUserByIdAsync(followDTO.FollowerId);
            var channelExist = await userService.GetUserByIdAsync(followDTO.ChannelId);
            if(followerExist == null || channelExist == null ) {
                return NotFound("User not found");
            }

            bool isFollowing = await _followingService.IsFollowing(followDTO.ChannelId, followDTO.FollowerId);
            if(isFollowing) {
                return BadRequest("User is already following");
            }

            var result = await _followingService.FollowUser(followDTO.FollowerId, followDTO.ChannelId);
            if (result.Succeeded) {
                return Ok("Follow successfully");
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("unfollow")]
        public async Task<IActionResult> UnfollowUser([FromBody] FollowDTO followDTO) {
            var followerExist = await userService.GetUserByIdAsync(followDTO.FollowerId);
            var channelExist = await userService.GetUserByIdAsync(followDTO.ChannelId);
            if(followerExist == null || channelExist == null ) {
                return NotFound("User not found");
            }

            bool isFollowing = await _followingService.IsFollowing(followDTO.ChannelId, followDTO.FollowerId);
            if(!isFollowing) {
                return BadRequest("User is not following");
            }
            var result = await _followingService.UnfollowUser(followDTO.FollowerId, followDTO.ChannelId);
            if (result.Succeeded) {
                return Ok("Unfollow successfully");
            }
            return BadRequest(result.Errors);
        }
    }
}