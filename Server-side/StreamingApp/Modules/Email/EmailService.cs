using MimeKit;
using MailKit.Net.Smtp;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly AppDbContext _context;

    public EmailService(IConfiguration configuration, AppDbContext context)
    {
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task SendEmailAsync(int userId, string subject, string message)
    {
        // Kiểm tra cấu hình email
        var smtpServer = _configuration["Email:SmtpServer"];
        var smtpPort = _configuration["Email:Port"];
        var smtpUsername = _configuration["Email:Username"];
        var smtpPassword = _configuration["Email:Password"];
        var emailFrom = _configuration["Email:From"];

        if (string.IsNullOrEmpty(smtpServer) || 
            string.IsNullOrEmpty(smtpUsername) || 
            string.IsNullOrEmpty(smtpPassword) || 
            string.IsNullOrEmpty(emailFrom))
        {
            throw new InvalidOperationException("Email configuration is missing.");
        }

        // Tìm thông tin người dùng
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            Console.WriteLine($"User with ID {userId} not found.");
            return;
        }

        // Tạo email
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("Stream App", emailFrom));
        emailMessage.To.Add(new MailboxAddress(user.UserName ?? "User", user.Email));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart("html") { Text = message };

        // Gửi email
        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync(smtpServer, int.Parse(smtpPort), MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(smtpUsername, smtpPassword);
            await client.SendAsync(emailMessage);
            Console.WriteLine($"Email sent successfully to {user.Email}.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
        }
        finally
        {
            await client.DisconnectAsync(true);
        }
    }
}
