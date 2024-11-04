using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.DTOs;
using StreamingApp.Services;
using StreamingApp.Models.Entities;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagController : ControllerBase
    {
         private readonly ITagService _tagService;

        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTagAsync()
        {
            try
            {
                var tags = await _tagService.GetAllTagsAsync();
                return Ok(tags);
            }
            catch (Exception ex)
            {
                // Log lỗi chi tiết
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTagWithIdAsync(int id)
        {
            var tag = await _tagService.GetTagByIdAsync(id);
            if (tag==null) return NotFound("Tag not found");
            else return Ok(tag);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTagAsync([FromBody] Tag model)
        {
            var tag = await _tagService.CreateTagAsync(model);
            if(tag == null)
            {
                return BadRequest("Create tag failed");
            }
            return Ok("Create tag successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTagAsync(int id,Tag model)
        {
            if(id!=model.TagId) 
                return BadRequest("Id is not match");

            var result = await _tagService.UpdateTagAsync(id,model);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Update tag successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTagAsync(int id)
        {
            var result = await _tagService.DeleteTagAsync(id);
            if (!result)
                return NotFound("Tag not found");

            return Ok("Delete tag successfully");
        }
    }
}