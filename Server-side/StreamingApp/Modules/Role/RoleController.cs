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
        public async Task<IActionResult> AssignChannelModAsync([FromBody] ModDTO ModDTO)
        {
            var result = await _roleService.AssignChannelModAsync(ModDTO.ChannelId, ModDTO.UserId);
            if (result.Succeeded)
            {
                return Ok(result.Errors);
            }
            return BadRequest(result.Errors);
        }

        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] RoleDTO RoleDto)
        {
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

        [HttpGet("is")]
        public async Task<IActionResult> IsChannelModAsync([FromBody] ModDTO ModDTO)
        {
            var result = await _roleService.IsChannelModAsync(ModDTO.ChannelId, ModDTO.UserId);
            return Ok(result.Errors);
        }
    }
}
