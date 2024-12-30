using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.DTOs;
using StreamingApp.Services;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                if (users == null) return NotFound();
                return Content(users, "application/json");
            }
            catch (Exception ex)
            {
                // Log lỗi chi tiết
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var userJson = await _userService.GetUserByIdAsyncWithRole(id);
            if (userJson == null) return NotFound();
            return Content(userJson, "application/json");
        }

        [HttpGet("name={name}")]
        public async Task<IActionResult> GetUser(string name)
        {
            var user = await _userService.GetUserByNameAsync(name);
            if (user == null)
                return NotFound("User not found");
            return Content(user, "application/json");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserUpdateDto userUpdateDto)
        {
            if (id != userUpdateDto.UserId)
                return BadRequest("Id is not match");

            var result = await _userService.UpdateUserAsync(userUpdateDto);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Update user successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (!result)
                return NotFound("User not found");

            return Ok("Delete user successfully");
        }

        [HttpPut("{id}/update-image")]
        public async Task<IActionResult> UpdateImageUserAsync(int id, [FromForm] UserUpdateImageDTO model)
        {
            var User = await _userService.GetUserByIdAsync(id);
            if( User == null) 
                return NotFound("User not found");
            
            if(id!=model.UserId)
                return BadRequest("Id is not match");
            
            var result = await _userService.UpdateImageUserAsync(id,model);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Update image of user successfully");

        }

        [HttpPut("{id}/update-password")]
        public async Task<IActionResult> UpdatePassword(int id, [FromBody] UserUpdatePasswordDto userUpdatePasswordDto)
        {
            if (id != userUpdatePasswordDto.UserId)
                return BadRequest("Id is not match");

            var result = await _userService.UpdatePasswordAsync(userUpdatePasswordDto);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Update password successfully");
        }

    }
}