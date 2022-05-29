using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SocialMap.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Repositories
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<POI> POI { get; set; }
        public DbSet<POIAccess> POIAccess { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<POI>()
                .HasOne(p => p.AppUser)
                .WithMany(u => u.POIs)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<POIAccess>()
                .HasIndex(pa => new { pa.POIId, pa.AppUserId })
                .IsUnique();

            modelBuilder.Entity<Like>()
                .HasIndex(l => new { l.AppUserId, l.POIId })
                .IsUnique();

            modelBuilder.Entity<Category>()
                .HasIndex(c => c.Name)
                .IsUnique();
        }
    }
}
