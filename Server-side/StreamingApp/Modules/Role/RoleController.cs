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

        [HttpPost("assign-mod")]
        public async Task<IActionResult> AssignChannelModAsync([FromBody] ModDto ModDto)
        {
            var result = await _roleService.AssignChannelModAsync(ModDto.channelId, ModDto.userId);
            if (result.Succeeded)
            {
                return Ok(result.Errors);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] RoleDto RoleDto)
        {
            var result = await _roleService.AssignRole(RoleDto.channelId, RoleDto.userId, RoleDto.roleId);
            if (result.Succeeded)
            {
                return Ok(result.Errors);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("remove-role")]
        public async Task<IActionResult> RemoveRole([FromBody] RoleDto RoleDto)
        {
            var result = await _roleService.RemoveRole(RoleDto.channelId, RoleDto.userId, RoleDto.roleId);
            if (result.Succeeded)
            {
                return Ok(result.Errors);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("remove-mod")]
        public async Task<IActionResult> RemoveChannelModAsync([FromBody] ModDto ModDto)
        {
            var result = await _roleService.RemoveChannelModAsync(ModDto.channelId, ModDto.userId);
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

        [HttpGet("is")]
        public async Task<IActionResult> IsChannelModAsync([FromBody] ModDto ModDto)
        {
            var result = await _roleService.IsChannelModAsync(ModDto.channelId, ModDto.userId);
            return Ok(result.Errors);
        }
    }
}
