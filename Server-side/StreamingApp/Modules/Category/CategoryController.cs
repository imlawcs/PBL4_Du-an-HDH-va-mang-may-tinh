using Microsoft.AspNetCore.Mvc;
using StreamingApp.Services;
using StreamingApp.Models.Entities;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategoryAsync()
        {
            try
            {
                var categories = await _categoryService.GetAllCategoryAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                // Log lỗi chi tiết
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryByIdAsync(int id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound("Category not found");
            }
            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategoryAsync([FromBody] Category model)
        {
            var category = await _categoryService.CreateCategoryAsync(model);
            if(category == null)
            {
                return BadRequest("Create category failed");
            }
            return Ok("Create category successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategoryAsync(int id,Category model)
        {
            if(id!=model.CategoryId) 
                return BadRequest("Id is not match");

            var result = await _categoryService.UpdateCategoryAsync(id,model);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Update category successfully");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoryAsync(int id)
        {
            var result = await _categoryService.DeleteCategoryAsync(id);
            if (!result)
                return NotFound("Category not found");

            return Ok("Delete category successfully");
        }
    }
}