using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.DTOs;
using StreamingApp.Services;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService _roleService)
        {
            this._roleService = _roleService;
        }

        [HttpGet("{roleId}")]
        public async Task<IActionResult> GetRoleByIdAsync(int roleId)
        {
            var result = await _roleService.GetRoleByIdAsync(roleId);
            if (result == null)
                return NotFound("Role not found");
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRoles()
        {
            var result = await _roleService.GetAllRoles();
            if (result == null)
                return NotFound("Roles not found");
            return Ok(result);
        }

        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] RoleDTO RoleDto)
        {
            if (RoleDto.UserId == 0 || RoleDto.RoleId == 0 || RoleDto.ChannelId == 0)
                return BadRequest("Missing required fields");

            if(RoleDto.UserId == 1 || RoleDto.ChannelId == 1)
                return BadRequest("Assign role to Admin is not allowed");

            if (RoleDto.RoleId == 1) {
                if(RoleDto.ChannelId != 1)
                    return BadRequest("Channel Id must be 1 for Admin role");                
            }

            if(RoleDto.RoleId == 2) {
                if(RoleDto.ChannelId != RoleDto.UserId)
                    return BadRequest("User must be the owner of the channel");
            }
            var result = await _roleService.AssignRole(RoleDto.ChannelId, RoleDto.UserId, RoleDto.RoleId);
            if (result.Succeeded)
            {
                return Ok(result.Errors);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("remove-role")]
        public async Task<IActionResult> RemoveRole([FromBody] RoleDTO RoleDto)
        {
            var result = await _roleService.RemoveRole(RoleDto.ChannelId, RoleDto.UserId, RoleDto.RoleId);
            if (result.Succeeded)
            {
                return Ok(result.Errors);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("assign-mod")]
        public async Task<IActionResult> AssignChannelModAsync([FromBody] ModDTO ModDTO)
        {
            var result = await _roleService.AssignChannelModAsync(ModDTO.ChannelId, ModDTO.UserId);
            if (result.Succeeded)
            {
                return Ok(result.Errors);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("remove-mod")]
        public async Task<IActionResult> RemoveChannelModAsync([FromBody] ModDTO ModDTO)
        {
            var result = await _roleService.RemoveChannelModAsync(ModDTO.ChannelId, ModDTO.UserId);
            if (result.Succeeded)
            {
                return Ok(result.Errors);
            }
            return BadRequest(result.Errors);
        }

        [HttpGet("{channelId}-mod")]
        public async Task<IActionResult> GetChannelModAsync(int channelId)
        {
            Console.WriteLine("GetChannelModAsync: " + channelId);
            var result = await _roleService.GetChannelModAsync(channelId);
            if (result  == null)
                return NotFound();
            return Ok(result);
        }

        // [HttpGet("is")]
        // public async Task<IActionResult> IsChannelModAsync([FromBody] ModDTO ModDTO)
        // {
        //     var result = await _roleService.IsChannelModAsync(ModDTO.ChannelId, ModDTO.UserId);
        //     return Ok(result.Errors);
        // }
    }
}
