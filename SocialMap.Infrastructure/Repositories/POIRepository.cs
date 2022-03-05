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
        private AppDbContext _appDbContext;
        public POIRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<POI> AddAsync(POI poi)
        {
            try
            {
                _appDbContext.POI.Add(poi);
                _appDbContext.SaveChanges();

                //Task.CompletedTask;
                return await Task.FromResult(_appDbContext.POI.FirstOrDefault(x => x.Id == poi.Id));
            }
            catch (Exception ex)
            {
                await Task.FromException(ex);
                return null;
            }
        }

        public async Task<IEnumerable<POI>> BrowseAllAsync()
        {
            return await Task.FromResult(_appDbContext.POI);
        }

        public async Task DelAsync(int id)
        {
            try
            {
                _appDbContext.Remove(_appDbContext.POI.FirstOrDefault(x => x.Id == id));
                _appDbContext.SaveChanges();
                await Task.CompletedTask;
            }
            catch (Exception ex)
            {
                await Task.FromException(ex);
            }
        }

        public async Task<POI> GetAsync(int id)
        {
            try
            {
                return await Task.FromResult(_appDbContext.POI.FirstOrDefault(x => x.Id == id));

            }
            catch (Exception ex)
            {
                await Task.FromException(ex);
                return null;
            }
        }

        public async Task UpdateAsync(POI poi)
        {
            try
            {
                var z = _appDbContext.POI.FirstOrDefault(x => x.Id == poi.Id);

                z.Name = poi.Name;
                z.X = poi.X;
                z.Y = poi.Y;
                z.Description = poi.Description;
                z.IsGlobal = poi.IsGlobal;
                z.AppUserId = poi.AppUserId;
                z.CategoryId = poi.CategoryId;
                z.Category = poi.Category;

                z.Likes = poi.Likes; // ?? czy to jest dobrze ?
                z.Comments = poi.Comments;

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
