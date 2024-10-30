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
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            
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
            services.AddScoped<ModManager>();
            services.AddScoped<IModService, ModService>();

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
                // options.Authority = "http://localhost:3000";
                // options.RequireHttpsMetadata = false;
                // options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],

                    ValidateAudience = true,
                    ValidAudience = Configuration["Jwt:Audience"],
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });

            // Cấu hình Authorization
            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdminRole", policy => 
                    policy.RequireRole("Admin")); 

                options.AddPolicy("RequireUserRole", policy => 
                    policy.RequireRole("2"));
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

            app.UseAuthentication();

            app.UseMiddleware<JwtMiddleware>();
            app.UseMiddleware<ValidateMiddleware>();
            app.UseMiddleware<AuthorizationMiddleware>();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
