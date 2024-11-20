using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.DTOs;
using StreamingApp.Services;
using StreamingApp.Models.Entities;
using System.Text.Json;
using System;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class User_RoleController : ControllerBase
    {
        private readonly IUser_RoleService _User_RoleService;
        private readonly IUserService _userService;
        private readonly IRoleService _roleService;

        public User_RoleController(IUser_RoleService User_RoleService, IUserService userService, IRoleService roleService)
        {
            _User_RoleService = User_RoleService;
            _userService = userService;
            _roleService = roleService;
        }

        public static bool _shouldIncludeUserId = false;

        [HttpGet]
        public async Task<IActionResult> GetAllUser_RoleAsync()
        {
            var User_Roles = await _User_RoleService.GetAllUser_RolesAsync();
            
            if (User_Roles == null) return NotFound("User_Roles not found");
            
            var options = new JsonSerializerOptions
            {
                Converters = { new ConditionalChannelOwnerIdConverter() }
            };

            // Serialize với options
            var jsonString = JsonSerializer.Serialize(User_Roles, options);
            
            return Content(jsonString, "application/json");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser_RoleWithIdAsync(int id)
        {
            var User_Role = await _User_RoleService.GetListUser_RoleByIdAsync(id);
            if (User_Role==null) return NotFound("User_Roles not found");
            var options = new JsonSerializerOptions
            {
                Converters = { new ConditionalChannelOwnerIdConverter() },
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };

            var jsonString = JsonSerializer.Serialize(User_Role, options);

            return Content(jsonString, "application/json");
        }

        [HttpGet("UserId={UserId}/RoleId={RoleId}/ChannelOwnerId={ChannelOwnerId}")]
        public async Task<IActionResult> GetUser_RoleWithIdAsync(int UserId, int RoleId, int ChannelOwnerId)
        {
            var User_Role = await _User_RoleService.GetUser_RoleByIdAsync(UserId, RoleId, ChannelOwnerId);
            if (User_Role == null) return NotFound("User_Role not found");
            
            var options = new JsonSerializerOptions
            {
                Converters = { new ConditionalChannelOwnerIdConverter() }
            };

            // Serialize với options
            var jsonString = JsonSerializer.Serialize(User_Role, options);
            
            return Content(jsonString, "application/json");
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser_RoleAsync([FromBody] User_Role model)
        {
            Console.WriteLine($"Creating User_Role with UserId: {model.UserId}, RoleId: {model.RoleId}, ChannelOwnerId: {model.ChannelOwnerId}");

            var user = await _userService.GetUserByIdAsync(model.UserId);
            if (user == null) return BadRequest("User not found");

            var roleResult = await _roleService.GetRoleByIdAsync(model.RoleId);
            if (roleResult == null) return BadRequest("Role not found");

            var channelOwner = await _userService.GetUserByIdAsync(model.ChannelOwnerId);
            if (channelOwner == null) return BadRequest("Channel Owner not found");

            var User_Role = await _User_RoleService.CreateUser_RoleAsync(model);
            if(User_Role == null)
            {
                return BadRequest("Create User_Role failed");
            }
            return Ok("Create User_Role successfully");
        }

        [HttpPut("user={UserId}/role={RoleId}/channel={ChannelOwnerId}")]
        public async Task<IActionResult> UpdateUser_RoleAsync(int UserId, int RoleId, int ChannelOwnerId, [FromBody] User_Role model)
        {
            if(UserId!=model.UserId)  
                return BadRequest("Id is not match");
            
            if(RoleId != model.RoleId && ChannelOwnerId != model.ChannelOwnerId)
                return BadRequest("Role Id or Channel Owner Id is not match");

            var result = await _User_RoleService.UpdateUser_RoleAsync(UserId, RoleId, ChannelOwnerId, model);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Update User_Role successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser_RoleAsync(int id)
        {
            var result = await _User_RoleService.DeleteUser_RoleAsync(id);
            if (!result)
                return NotFound("User_Roles not found");

            return Ok("Delete User_Roles successfully");
        }

        [HttpDelete("{UserId}/{RoleId}/{ChannelOwnerId}")]
        public async Task<IActionResult> DeleteUser_RoleAsync(int UserId, int RoleId, int ChannelOwnerId)
        {
            var result = await _User_RoleService.DeleteUser_RoleAsync(UserId, RoleId, ChannelOwnerId);
            if (!result)
                return NotFound("User_Role not found");

            return Ok("Delete User_Role successfully");
        }

    }
}