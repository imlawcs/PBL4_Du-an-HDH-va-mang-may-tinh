using Microsoft.AspNetCore.Authentication.Cookies; // Đảm bảo đã thêm namespace này
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Facebook;
using Microsoft.AspNetCore.Authentication.Twitter;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StreamingApp.Hubs;
using StreamingApp.Managers;
using StreamingApp.Middlewares;
using StreamingApp.Services;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;

namespace StreamingApp
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles; // Sử dụng IgnoreCycles
                    options.JsonSerializerOptions.WriteIndented = true;
                });

            // Đăng ký CORS
            services.AddCors(options =>
            {
                options.AddPolicy("ClientPermission", policy =>
                {
                    policy.WithOrigins(Configuration["ClientSide:Url"], "https://localhost:5173")
                        .SetIsOriginAllowedToAllowWildcardSubdomains()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            // Đăng ký các dịch vụ
            services.AddSignalR();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<CategoryManager>();
            services.AddScoped<ICategoryService, CategoryService>();

            services.AddScoped<RoleManager>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<User_RoleManager>();
            services.AddScoped<IUser_RoleService, User_RoleService>();


            // services.AddScoped<ModManager>();
            // services.AddScoped<IModService, ModService>();

            services.AddScoped<TagManager>();
            services.AddScoped<ITagService, TagService>();

            services.AddScoped<FollowingManager>();
            services.AddScoped<IFollowingService, FollowingService>();

            services.AddScoped<NotificationManager>();
            services.AddScoped<INotificationService, NotificationService>();

            services.AddScoped<EmailService>();
            services.AddScoped<IEmailService, EmailService>();

            services.AddScoped<BlockedManager>();
            services.AddScoped<IBlockedService, BlockedService>();

            services.AddScoped<StreamManager>();
            services.AddScoped<IStreamService, StreamService>();

            services.AddScoped<StreamTagManager>();
            services.AddScoped<IStreamTagService, StreamTagService>();

            services.AddScoped<StreamCategoryManager>();
            services.AddScoped<IStreamCategoryService, StreamCategoryService>();

            services.AddSingleton<MainHub>();
            services.AddSingleton<NotificationHub>();

            services.AddScoped<UserManager>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IFileService, FileService>();


            // Đăng ký JWT Authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {

                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            })

            // Đăng ký Cookie Authentication và OAuth
            // services.AddAuthentication(options =>
            // {
            //     options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //     options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //     options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            // })

            .AddCookie()
            .AddGoogle(options =>
            {
                options.ClientId = Configuration["Google:ClientId"];
                options.ClientSecret = Configuration["Google:ClientSecret"];
                options.CallbackPath = "/signin-google"; // URI callback
            })
            .AddFacebook(options =>
            {
                options.AppId = Configuration["Facebook:AppId"];
                options.AppSecret = Configuration["Facebook:AppSecret"];
                options.CallbackPath = "/signin-facebook"; // URI callback
            })
            .AddTwitter(options =>
            {
                options.ConsumerKey = Configuration["Twitter:ApiKey"];
                options.ConsumerSecret = Configuration["Twitter:ApiSecretKey"];
                options.CallbackPath = "/signin-twitter"; // URI callback
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdminRole", policy =>
                    policy.RequireRole("Admin"));

                options.AddPolicy("RequireUserRole", policy =>
                    policy.RequireRole("User"));
            });

            // Đăng ký Swagger cho API Documentation
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Cấu hình Swagger cho môi trường phát triển
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();
            app.UseCors("ClientPermission");
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.WebRootPath, "uploads")),
                RequestPath = "/uploads"
            });


            // app.UseAuthentication();
            // app.UseMiddleware<JwtMiddleware>();
            // app.UseMiddleware<ValidateMiddleware>();
            // app.UseMiddleware<AuthorizationMiddleware>();
            // app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotificationHub>("/notification");
                endpoints.MapHub<MainHub>("/webrtc");

            });
        }
    }
}
