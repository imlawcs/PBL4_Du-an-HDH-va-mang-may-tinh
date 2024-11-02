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
        entity.HasKey(b => new { b.BlockerId, b.BlockedId });

        entity.HasOne(b => b.Blocker)
            .WithMany(u => u.BlockedUsers)
            .HasForeignKey(b => b.BlockerId)
            .OnDelete(DeleteBehavior.Restrict);

        entity.HasOne(b => b.BlockedUser)
            .WithMany(u => u.BlockedByUsers)
            .HasForeignKey(b => b.BlockedId)
            .OnDelete(DeleteBehavior.Restrict);
    });

    modelBuilder.Entity<User_Role>(entity =>
    {
        entity.HasKey(ur => new { ur.UserId, ur.RoleId });

        entity.HasOne(ur => ur.User) // Quan hệ với User qua UserId
        .WithMany()
        .HasForeignKey(ur => ur.UserId)
        .OnDelete(DeleteBehavior.NoAction);

        entity.HasOne(ur => ur.ChannelOwner) // Quan hệ với User qua ChannelOwnerId
        .WithMany()
        .HasForeignKey(ur => ur.ChannelOwnerId)
        .OnDelete(DeleteBehavior.NoAction);

        entity.HasOne(ur => ur.Role) // Quan hệ với Role
        .WithMany(r => r.UserRoles)
        .HasForeignKey(ur => ur.RoleId)
        .OnDelete(DeleteBehavior.NoAction);

    });

            modelBuilder.Entity<Following>(entity =>
        {
            entity.HasKey(f => new { f.FollowerId, f.FolloweeId });

            entity.HasOne(f => f.Follower)
                .WithMany(u => u.Followings)
                .HasForeignKey(f => f.FollowerId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(f => f.Followee)
                .WithMany(u => u.Followers)
                .HasForeignKey(f => f.FolloweeId)
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
                new User { UserId = 1, UserName = "admin1", Password = BCrypt.Net.BCrypt.HashPassword("11111111"), Email = "daolehanhnguyen@gmail.com", PhoneNumber = "0333414094", DisplayName = "Dao Le Hanh Nguyen"},
                new User { UserId = 2, UserName = "admin2", Password = BCrypt.Net.BCrypt.HashPassword("22222222"), Email = "minhnguyetdn2004@gmail.com", PhoneNumber = "0775500744", DisplayName = "Huynh Thuy Minh Nguyet"},
                new User { UserId = 3, UserName = "admin3", Password = BCrypt.Net.BCrypt.HashPassword("33333333"), Email = "huukhoa04@gmail.com", PhoneNumber = "0333414094", DisplayName = "Nguyen Huu Khoa"}
            );

            modelBuilder.Entity<User_Role>().HasData(
                new User_Role { UserId = 1, RoleId = 1},
                new User_Role { UserId = 2, RoleId = 1},
                new User_Role { UserId = 3, RoleId = 1}
            );

            base.OnModelCreating(modelBuilder);

        }


}