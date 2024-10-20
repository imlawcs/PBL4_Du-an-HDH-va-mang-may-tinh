using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Text.Json;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using StreamingApp.Exceptions;

namespace StreamingApp.Middlewares
{
    public class ValidateMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly HashSet<string> validDomains = new HashSet<string>
        {
            "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", // Thêm các tên miền phổ biến khác nếu cần
        };

        public ValidateMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {

            var path = context.Request.Path.ToString();
            if (path.Equals("/api/auth/register", StringComparison.OrdinalIgnoreCase) || 
                path.Equals("/api/auth/login", StringComparison.OrdinalIgnoreCase))
            {
                context.Request.EnableBuffering();
                var buffer = new byte[Convert.ToInt32(context.Request.ContentLength)];
                await context.Request.Body.ReadAsync(buffer, 0, buffer.Length);
                var requestBody = System.Text.Encoding.UTF8.GetString(buffer);
                context.Request.Body.Position = 0;

                try
                {
                    ValidationResult validationResult = ValidateRequest(path, requestBody);
                    if (validationResult != ValidationResult.Success)
                    {
                        context.Response.StatusCode = StatusCodes.Status400BadRequest;
                        await context.Response.WriteAsync(JsonSerializer.Serialize(new { error = validationResult.ErrorMessage }));
                        return;
                    }
                }
                catch (JsonException ex)
                {
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsync(JsonSerializer.Serialize(new { error = "Invalid JSON format: " + ex.Message }));
                    return;
                }
                catch (CustomException ex)
                {
                    context.Response.StatusCode = ex.ErrorCode; // Sử dụng mã lỗi từ ngoại lệ
                    var options = new JsonSerializerOptions
                    {
                        Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping
                    };
                    await context.Response.WriteAsync(JsonSerializer.Serialize(new { error = ex.Message }, options));
                    return;
                }
                catch (Exception ex) // Bắt tất cả các ngoại lệ khác để đảm bảo không có lỗi không được xử lý
                {
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError; // Hoặc mã trạng thái khác nếu cần
                    await context.Response.WriteAsync(JsonSerializer.Serialize(new { error = "An unexpected error occurred: " + ex.Message }));
                    return;
                }
            }

            await _next(context);
        }


        private ValidationResult ValidateRequest(string path, string requestBody)
        {
            if (path.Equals("/api/auth/register", StringComparison.OrdinalIgnoreCase))
            {
                var registerModel = JsonSerializer.Deserialize<RegisterModel>(requestBody);
                var validationContext = new ValidationContext(registerModel);
                var validationResults = new List<ValidationResult>();
                bool isValid = Validator.TryValidateObject(registerModel, validationContext, validationResults, true);

                if (!isValid)
                {
                    Console.WriteLine($"Validation Errors: {string.Join(", ", validationResults.Select(v => v.ErrorMessage))}");
                    return validationResults.First();
                }

                // Kiểm tra email có hợp lệ không
                if (!IsValidEmail(registerModel.Email))
                {
                    Console.WriteLine("Email không hợp lệ: " + registerModel.Email);
                    throw new CustomException
                    {
                        ErrorCode = 400,
                        Message = "Email không hợp lệ."
                    };
                }
            }
            else if (path.Equals("/api/auth/login", StringComparison.OrdinalIgnoreCase))
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

        private bool IsValidEmail(string email)
        {
            // Biểu thức chính quy để kiểm tra định dạng email
            var emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            
            // Kiểm tra email theo biểu thức chính quy
            if (!Regex.IsMatch(email, emailPattern))
            {
                return false; // Email không hợp lệ về định dạng
            }

            // Kiểm tra tên miền
            var domain = email.Split('@')[1];

            // Kiểm tra tên miền hợp lệ
            if (!validDomains.Contains(domain.ToLower()))
            {
                Console.WriteLine($"Tên miền không hợp lệ: {domain}");
                return false; // Tên miền không hợp lệ
            }

            // Kiểm tra tên miền có cấu trúc hợp lệ
            var domainParts = domain.Split('.');
            if (domainParts.Length < 2 || domainParts.Any(part => part.Length < 2))
            {
                return false; // Tên miền không hợp lệ
            }

            // Kiểm tra không có ký tự không hợp lệ trong tên miền
            foreach (var part in domainParts)
            {
                if (part.Any(c => !char.IsLetterOrDigit(c) && c != '-'))
                {
                    return false; // Tên miền chứa ký tự không hợp lệ
                }
            }

            return true; // Email hợp lệ
        }
    }
}
