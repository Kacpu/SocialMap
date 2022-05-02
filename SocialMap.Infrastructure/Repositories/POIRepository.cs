using Microsoft.EntityFrameworkCore;
using SocialMap.Core.Domain;
using SocialMap.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Repositories
{
    public class POIRepository : IPOIRepository
    {
        private readonly AppDbContext _appDbContext;

        public POIRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<POI> AddAsync(POI poi)
        {
            _appDbContext.POI.Add(poi);
            await _appDbContext.SaveChangesAsync();

            var rp = await _appDbContext.POI.Include(x => x.AppUser).Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == poi.Id);
            return await Task.FromResult(rp);
        }

        public async Task<POI> GetAsync(int id)
        {
            var p = await _appDbContext.POI.Include(x => x.AppUser).Include(x => x.Categories).Include(x => x.Likes)
                .AsSplitQuery().FirstOrDefaultAsync(x => x.Id == id);

            return await Task.FromResult(p);
        }

        public async Task<IEnumerable<POI>> BrowseAllAsync(int? creatorId, bool? isGlobal, bool? isAccepted)
        {
            var p = _appDbContext.POI.AsQueryable();

            if(creatorId != null)
            {
                p = p.Where(x => x.AppUserId == creatorId);
            }

            if(isGlobal != null)
            {
                p = p.Where(x => x.IsGlobal == isGlobal);
            }

            if (isAccepted != null)
            {
                p = p.Where(x => x.IsAccepted == isAccepted);
            }

            p = p.Include(x => x.Categories);

            return await Task.FromResult(p);
        }

        public async Task<IEnumerable<POI>> GetAllAccessedAsync(int userId)
        {
            var pas = _appDbContext.POIAccess.Where(x => x.AppUserId == userId);
            var pois = _appDbContext.POI.Where(p => pas.Any(pa => pa.POIId == p.Id)).Include(x => x.Categories);

            return await Task.FromResult(pois);
        }

        public async Task UpdateAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DelAsync(int id)
        {
            var p = await _appDbContext.POI.FirstOrDefaultAsync(x => x.Id == id);
            _appDbContext.Remove(p);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
