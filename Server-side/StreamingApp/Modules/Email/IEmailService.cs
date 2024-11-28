public interface IEmailService
{
    Task SendEmailAsync(int userId, string subject, string message);
}