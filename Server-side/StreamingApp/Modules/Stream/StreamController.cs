using Microsoft.AspNetCore.Mvc;
using StreamingApp.Models.DTOs;
using StreamingApp.Models.Entities;
using StreamingApp.Services;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StreamController : ControllerBase
    {
        private readonly IStreamService _streamService;
        private readonly IStreamCategoryService _streamCategoryService;
        private readonly IStreamTagService _streamTagService;

        public StreamController(IStreamService streamService, IStreamCategoryService streamCategoryService, IStreamTagService streamTagService)
        {
            _streamService = streamService;
            _streamCategoryService = streamCategoryService;
            _streamTagService = streamTagService;
        }
        

        [HttpGet]
        public async Task<IActionResult> GetAllStreamAsync()
        {
            try
            {
                var stream = await _streamService.GetAllStreamsAsync();
                return Ok(stream);
            }
            catch (Exception ex)
            {
                // Log lỗi chi tiết
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetstreamWithIdAsync(int id)
        {
            var stream = await _streamService.GetStreamByIdAsync(id);
            if (stream==null) return NotFound("Stream not found");
            else return Ok(stream);
        }

        [HttpPost]
        public async Task<IActionResult> CreateStreamAsync([FromBody] StreamDTO model)
        {
            var streamModel = new Models.Entities.Stream{
                UserId = model.UserId,
                StreamDate = DateTime.Now,
                IsLive = model.IsLive,
                StreamTitle = model.StreamTitle,
                StreamDesc = model.StreamDesc
            };
            var stream = await _streamService.CreateStreamAsync(streamModel);
            if(!stream.Succeeded)
            {
                //không tạo thành công stream
                return BadRequest(stream.Errors);
            }

            var streamCategory = new StreamCategory { StreamId=streamModel.StreamId ,CategoryId = model.StreamCategoryId };
            
            foreach(int i in model.StreamTagIds){
                var streamTag = new StreamTag { StreamId=streamModel.StreamId, TagId = i };
                var newStreamTag = await _streamTagService.CreateStreamTagAsync(streamTag);
                if(!newStreamTag.Succeeded)
                {
                    //không tạo thành công stream tag
                    return BadRequest(newStreamTag.Errors);
                }
            }
        

            var newStreamCategory = await _streamCategoryService.CreateStreamCategoryAsync(streamCategory);
            
            if(!newStreamCategory.Succeeded)
            {
                //không tạo thành công stream category
                return BadRequest(newStreamCategory.Errors);
            }
        
            if (stream.Stream == null)
            {
                return StatusCode(500, "Stream creation failed.");
            }
            return Ok(stream.Stream.StreamId);
            
        }
        [HttpPut("{id}/update-image")]
        public async Task<IActionResult> UpdateImageStreamAsync(int id, [FromForm] StreamUpdateImageDTO model)
        {
            var stream = await _streamService.GetStreamByIdAsync(id);
            if( stream == null) 
                return NotFound("Stream not found");
            
            if(id!=model.StreamId)
                return BadRequest("Id is not match");
            
            var result = await _streamService.UpdateImageStreamAsync(id,model);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok("Update category successfully");

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStreamAsync(int id, [FromBody] StreamUpdateDTO model)
        {
            var stream = await _streamService.GetStreamByIdAsync(id);
            if( stream == null) 
                return NotFound("Stream not found");
                
            if(id!=model.StreamId) 
                return BadRequest("Id is not match");

            var modelStream = new Models.Entities.Stream{
                StreamId = model.StreamId,
                UserId = model.UserId,
                StreamDate = stream.StreamDate,
                IsLive = model.IsLive,
                StreamTitle = model.StreamTitle,
                StreamDesc = model.StreamDesc,
                StreamStatus = model.StreamStatus
            };

            var result = await _streamService.UpdateStreamAsync(modelStream);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            var currentTagIds = stream.StreamTags.Select(x => x.TagId).ToList();
            var newTagIds = model.StreamTagIds;

            if (!currentTagIds.SequenceEqual(newTagIds))
            {
            // Remove tags that are no longer associated with the stream
            var tagsToRemove = currentTagIds.Except(newTagIds).ToList();
            foreach (var tagId in tagsToRemove)
            {
                await _streamTagService.DeleteStreamTagAsync(model.StreamId, tagId);
            }

            // Add new tags that are not already associated with the stream
            var tagsToAdd = newTagIds.Except(currentTagIds).ToList();
            foreach (var tagId in tagsToAdd)
            {
                var streamTag = new StreamTag { StreamId = model.StreamId, TagId = tagId };
                var resultTag = await _streamTagService.CreateStreamTagAsync(streamTag);
                if (!resultTag.Succeeded)
                {
                    //không tạo thành công stream tag
                    return Ok(new
                    {
                        StreamCreated = true,
                        StreamMessage = "Update stream successfully",
                        StreamTagCreated = false,
                        StreamTagMessage = string.Join(", ", resultTag.Errors)
                    });
                }
            }}

            int categoryIdbefore = stream.StreamCategories.Select(x=>x.CategoryId).FirstOrDefault();
            int categoryIdafter = model.StreamCategoryId;
            if(categoryIdbefore!=categoryIdafter)
            {
                var streamCategory = new StreamCategory { StreamId=model.StreamId ,CategoryId = model.StreamCategoryId };
                var resultCategory = await _streamCategoryService.UpdateStreamCategoryAsync(model.StreamId, categoryIdbefore, streamCategory);
                if(!resultCategory.Succeeded)
                {
                //không tạo thành công stream category
                return Ok(new
                {
                    StreamCreated = true,
                    StreamMessage = "Update stream successfully",
                    StreamCategoryCreated = false,
                    StreamCategoryMessage = string.Join(", ", resultCategory.Errors)
                });
                }
            }
            return Ok("Update stream successfully");
        }

        

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStreamAsync(int id)
        {
            var result = await _streamService.DeleteStreamAsync(id);
            if (!result)
                return NotFound("Stream not found");

            return Ok("Delete stream successfully");
        }
    }
}