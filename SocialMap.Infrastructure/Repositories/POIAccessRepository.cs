using Microsoft.EntityFrameworkCore;
using SocialMap.Core.Domain;
using SocialMap.Core.Repositories;
using SocialMap.Infrastructure.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Repositories
{
    public class POIAccessRepository : IPOIAccessRepository
    {
        private readonly AppDbContext _appDbContext;

        public POIAccessRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<POIAccess> AddAsync(POIAccess poiAccess)
        {
            var pa = _appDbContext.POIAccess.FirstOrDefault(x => x.POIId == poiAccess.POIId && x.AppUserId == poiAccess.AppUserId);

            if (pa != null)
            {
                throw new BadRequestException("such poi access already exists");
            }

            try
            {
                _appDbContext.POIAccess.Add(poiAccess);
                await _appDbContext.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw new ForbidException("can not add pa");
            }

            return await Task.FromResult(poiAccess);
        }

        public async Task<POIAccess> GetAsync(int id)
        {
            var pa = await _appDbContext.POIAccess.Include(x => x.POI).ThenInclude(p => p.AppUser)
                .Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == id);

            return await Task.FromResult(pa);
        }

        public async Task<IEnumerable<POIAccess>> BrowseAllAsync(int? invitedUserId, int? poiId, int? issuerId, bool? isAccepted)
        {
            var pa = _appDbContext.POIAccess.AsQueryable();

            if(invitedUserId != null)
            {
                pa = pa.Where(x => x.AppUserId == invitedUserId);
            }

            if (poiId != null)
            {
                pa = pa.Where(x => x.POIId == poiId);
            }

            if (issuerId != null)
            {
                pa = pa.Where(x => x.POI.AppUserId == issuerId);
            }

            if (isAccepted != null)
            {
                pa = pa.Where(x => x.IsAccepted == isAccepted);
            }

            return await Task.FromResult(pa.Include(x => x.POI).ThenInclude(p => p.AppUser).Include(x => x.AppUser));
        }

        public async Task UpdateAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DelAsync(int id)
        {
            var paToDelete = await _appDbContext.POIAccess.FirstOrDefaultAsync(x => x.Id == id);
            _appDbContext.Remove(paToDelete);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
