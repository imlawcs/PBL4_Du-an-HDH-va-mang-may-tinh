using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace StreamingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    // [Authorize(Policy = "RequireUserRole")]
    [RequireRole("User")]
    public class HelloController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello World");
        }
    }
}
