using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.ComponentModel.DataAnnotations;

namespace StreamingApp.Middlewares
{
    public class ValidateMiddleware
    {
        private readonly RequestDelegate _next;

        public ValidateMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path.StartsWithSegments("/register") || context.Request.Path.StartsWithSegments("/login"))
            {
                context.Request.EnableBuffering();
                var buffer = new byte[Convert.ToInt32(context.Request.ContentLength)];
                await context.Request.Body.ReadAsync(buffer, 0, buffer.Length);
                var requestBody = System.Text.Encoding.UTF8.GetString(buffer);
                context.Request.Body.Position = 0;

                var validationResult = ValidateRequest(context.Request.Path, requestBody);
                if (validationResult != ValidationResult.Success)
                {
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsync(JsonSerializer.Serialize(new { error = validationResult.ErrorMessage }));
                    return;
                }
            }

            await _next(context);
        }

        private ValidationResult ValidateRequest(string path, string requestBody)
        {
            if (path.StartsWith("/register"))
            {
                var registerModel = JsonSerializer.Deserialize<RegisterModel>(requestBody);
                var validationContext = new ValidationContext(registerModel);
                var validationResults = new List<ValidationResult>();
                bool isValid = Validator.TryValidateObject(registerModel, validationContext, validationResults, true);
                if (!isValid)
                {
                    return validationResults.First();
                }
            }
            else if (path.StartsWith("/login"))
            {
                var loginModel = JsonSerializer.Deserialize<LoginModel>(requestBody);
                var validationContext = new ValidationContext(loginModel);
                var validationResults = new List<ValidationResult>();
                bool isValid = Validator.TryValidateObject(loginModel, validationContext, validationResults, true);
                if (!isValid)
                {
                    return validationResults.First();
                }
            }

            return ValidationResult.Success;
        }
    }
}