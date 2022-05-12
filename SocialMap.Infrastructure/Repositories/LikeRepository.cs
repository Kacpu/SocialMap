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
    public class LikeRepository : ILikeRepository
    {
        AppDbContext _appDbContext;

        public LikeRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Like> AddAsync(Like like)
        {
            _appDbContext.Likes.Add(like);
            await _appDbContext.SaveChangesAsync();
            return await Task.FromResult(like);
        }

        public async Task<Like> GetAsync(int id)
        {
            var l = await _appDbContext.Likes.FirstOrDefaultAsync(l => l.Id == id);
            return await Task.FromResult(l);
        }

        public async Task<IEnumerable<Like>> BrowseAllAsync(int? userId, int? poiId)
        {
            var ls = _appDbContext.Likes.AsQueryable();

            if(userId != null)
            {
                ls = ls.Where(l => l.AppUserId == userId);
            }

            if (poiId != null)
            {
                ls = ls.Where(l => l.POIId == poiId);
            }

            return await Task.FromResult(ls);
        }

        public async Task DelAsync(int id)
        {
            var l = await _appDbContext.Likes.FirstOrDefaultAsync(l => l.Id == id);
            _appDbContext.Remove(l);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
