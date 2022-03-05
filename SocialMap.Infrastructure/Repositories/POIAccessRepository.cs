using SocialMap.Core.Domain;
using SocialMap.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Repositories
{
    public class POIAccessRepository : IPOIAccessRepository
    {
        private AppDbContext _appDbContext;
        public POIAccessRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<POIAccess> AddAsync(POIAccess poiAccess)
        {
                        try
            {
                _appDbContext.POIAccess.Add(poiAccess);
                _appDbContext.SaveChanges();

                //Task.CompletedTask;
                return await Task.FromResult(_appDbContext.POIAccess.FirstOrDefault(x => x.Id == poiAccess.Id));
            }
            catch (Exception ex)
            {
                await Task.FromException(ex);
                return null;
            }
        }

        public async Task<IEnumerable<POIAccess>> BrowseAllAsync()
        {
            return await Task.FromResult(_appDbContext.POIAccess);
        }

        public async Task DelAsync(int id)
        {
            try
            {
                _appDbContext.Remove(_appDbContext.POIAccess.FirstOrDefault(x => x.Id == id));
                _appDbContext.SaveChanges();
                await Task.CompletedTask;
            }
            catch (Exception ex)
            {
                await Task.FromException(ex);
            }
        }

        public async Task<POIAccess> GetAsync(int id)
        {
            try
            {
                return await Task.FromResult(_appDbContext.POIAccess.FirstOrDefault(x => x.Id == id));

            }
            catch (Exception ex)
            {
                await Task.FromException(ex);
                return null;
            }
        }

        public async Task UpdateAsync(POIAccess poiAccess)
        {
            try
            {
                var z = _appDbContext.POIAccess.FirstOrDefault(x => x.Id == poiAccess.Id);

                z.POIId = poiAccess.POIId;
                z.AppUserId = poiAccess.AppUserId;
                z.IsAccpeted = poiAccess.IsAccpeted;

                _appDbContext.SaveChanges();

                await Task.CompletedTask;
            }
            catch (Exception ex)
            {
                await Task.FromException(ex);
            }


        }
    }
}
