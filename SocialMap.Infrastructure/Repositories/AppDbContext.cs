using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SocialMap.Core.Domain;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Repositories
{
    public class AppDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<POIAccess> POIAccess { get; set; }
        public DbSet<POI> POI { get; set; }


    }
}
