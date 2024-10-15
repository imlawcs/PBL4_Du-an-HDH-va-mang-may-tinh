using Microsoft.EntityFrameworkCore;
using StreamingApp.Models;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Blocked> Blockeds { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Following> Followings { get; set; }
    public DbSet<Moderator> Moderators { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<StreamTag> StreamTags { get; set; }
    public DbSet<StreamingApp.Models.Stream> Streams { get; set; }
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

        modelBuilder.Entity<Moderator>(entity =>
    {
        entity.HasKey(m => new { m.UserId, m.UserIdModerator });

        entity.HasOne(m => m.User)
            .WithMany(u => u.ModeratorOf)
            .HasForeignKey(m => m.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        entity.HasOne(m => m.ModeratorUser)
            .WithMany(u => u.Moderators)
            .HasForeignKey(m => m.UserIdModerator)
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

            base.OnModelCreating(modelBuilder);

        }


}