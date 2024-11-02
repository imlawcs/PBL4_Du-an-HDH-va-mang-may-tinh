using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StreamingApp.Hubs;
using StreamingApp.Managers;
using StreamingApp.Middlewares;
using StreamingApp.Services;

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


            // Đăng ký DbContext với chuỗi kết nối từ appsettings.json
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            
            //tránh lỗi vòng tròn
            services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                options.JsonSerializerOptions.WriteIndented = true;
            });

            //k hiện id, value
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
            });



            // Đăng ký CORS

            services.AddCors(options =>
            {
                options.AddPolicy("ClientPermission", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });
            // Đăng ký các dịch vụ
            services.AddControllers();
            services.AddSignalR();

            // Đăng ký dịch vụ AuthService
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<CategoryManager>();
            services.AddScoped<ICategoryService, CategoryService>();


            // services.AddScoped<ModManager>();
            // services.AddScoped<IModService, ModService>();

            services.AddScoped<TagManager>();
            services.AddScoped<ITagService, TagService>();




            services.AddSingleton<MainHub>();
            services.AddScoped<UserManager>();
            // Đăng ký JWT Authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = "https://localhost:5173";
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    // ValidAudience = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    // IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(Configuration["Jwt:Key"]))
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
                // options.Events = new JwtBearerEvents
                // {
                //     OnMessageReceived = context =>
                //     {
                //         var accessToken = context.Request.Query["access_token"];

                //         // If the request is for our hub...
                //         var path = context.HttpContext.Request.Path;
                //         if (!string.IsNullOrEmpty(accessToken) &&
                //             (path.StartsWithSegments("/webrtc")))
                //         {
                //             // Read the token out of the query string
                //             context.Token = accessToken;
                //         }
                //         return Task.CompletedTask;
                //     }
                // };
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

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors("ClientPermission");

            // Sử dụng Authentication trước khi Authorization
            app.UseAuthentication();

            // Thêm middleware tùy chỉnh của bạn (nếu cần thiết)
            // app.UseMiddleware<JwtMiddleware>();
            // app.UseMiddleware<ValidateMiddleware>();

            // Sử dụng Authorization sau Authentication
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
