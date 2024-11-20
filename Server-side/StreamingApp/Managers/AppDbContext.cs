using Microsoft.EntityFrameworkCore;
using StreamingApp.Models.Entities;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { 
    }
    public DbSet<Blocked> Blockeds { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Following> Followings { get; set; }
    public DbSet<User_Role> User_Roles { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<StreamTag> StreamTags { get; set; }
    public DbSet<StreamingApp.Models.Entities.Stream> Streams { get; set; }
    public DbSet<StreamCategory> StreamCategories { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<User> Users { get; set; }

     protected override void OnModelCreating(ModelBuilder modelBuilder)

        {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Blocked>(entity =>
    {
        entity.HasKey(b => new { b.ChannelId, b.BlockedId });

        entity.HasOne(b => b.Blocker)
            .WithMany(u => u.BlockedUsers)
            .HasForeignKey(b => b.ChannelId)
            .OnDelete(DeleteBehavior.Restrict);

        entity.HasOne(b => b.BlockedUser)
            .WithMany(u => u.BlockedByUsers)
            .HasForeignKey(b => b.BlockedId)
            .OnDelete(DeleteBehavior.Restrict);
    });

    modelBuilder.Entity<User_Role>(entity =>
    {
        entity.HasKey(ur => new { ur.UserId, ur.RoleId , ur.ChannelOwnerId});

        entity.HasOne(ur => ur.User)
            .WithMany(u => u.UserRoles)
            .HasForeignKey(ur => ur.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        entity.HasOne(ur => ur.Role)
            .WithMany(r => r.UserRoles)
            .HasForeignKey(ur => ur.RoleId)
            .OnDelete(DeleteBehavior.NoAction);

        entity.HasOne(ur => ur.ChannelOwner)
            .WithMany()
            .HasForeignKey(ur => ur.ChannelOwnerId)
            .OnDelete(DeleteBehavior.NoAction);
    });

            modelBuilder.Entity<Following>(entity =>
        {
            entity.HasKey(f => new { f.FollowerId, f.ChannelId });

            entity.HasOne(f => f.Follower)
                .WithMany(u => u.Followings)
                .HasForeignKey(f => f.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(f => f.Channel)
                .WithMany(u => u.Followers)
                .HasForeignKey(f => f.ChannelId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        
            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasKey(n => new { n.Id});

                entity.HasOne(n => n.User)
                    .WithMany(u => u.Notifications)
                    .HasForeignKey(n => n.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
                
            });

            modelBuilder.Entity<StreamCategory>()
                .HasKey(sc => new { sc.CategoryId, sc.StreamId });
            modelBuilder.Entity<StreamTag>()
                .HasKey(st => new { st.TagId, st.StreamId });

            modelBuilder.Entity<User>()
                .HasIndex(u => u.UserName)
                .IsUnique();

            

            modelBuilder.Entity<Role>().HasData(
            new Role { RoleId = 1, RoleName = "Admin", RoleDesc = "Admin" },
            new Role { RoleId = 2, RoleName = "User", RoleDesc = "User" },
            new Role { RoleId = 3, RoleName = "Moderator", RoleDesc = "Moderator" }
            );

            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, UserName = "Admin Placeholder" , Password = BCrypt.Net.BCrypt.HashPassword("00000000"), Email = "admin@gmail.com", PhoneNumber = "1111111111", DisplayName = "admin"} ,
                new User { UserId = 2, UserName = "admin1", Password = BCrypt.Net.BCrypt.HashPassword("11111111"), Email = "daolehanhnguyen@gmail.com", PhoneNumber = "0333414094", DisplayName = "Dao Le Hanh Nguyen"},
                new User { UserId = 3, UserName = "admin2", Password = BCrypt.Net.BCrypt.HashPassword("22222222"), Email = "minhnguyetdn2004@gmail.com", PhoneNumber = "0775500744", DisplayName = "Huynh Thuy Minh Nguyet"},
                new User { UserId = 4, UserName = "admin3", Password = BCrypt.Net.BCrypt.HashPassword("33333333"), Email = "huukhoa04@gmail.com", PhoneNumber = "0333414094", DisplayName = "Nguyen Huu Khoa"}
            );

            modelBuilder.Entity<User_Role>().HasData(
                new User_Role { UserId = 2, RoleId = 1 , ChannelOwnerId = 1},   
                new User_Role { UserId = 3, RoleId = 1, ChannelOwnerId = 1}, 
                new User_Role { UserId = 4, RoleId = 1, ChannelOwnerId = 1}
            );

            base.OnModelCreating(modelBuilder);

        }


}