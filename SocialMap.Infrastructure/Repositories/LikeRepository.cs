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
    public class LikeRepository : ILikeRepository
    {
        AppDbContext _appDbContext;

        public LikeRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Like> AddAsync(Like like)
        {
            var check_like = _appDbContext.Likes.FirstOrDefault(x => x.POIId == like.POIId && x.AppUserId == like.AppUserId);

            if (check_like != null)
            {
                throw new BadRequestException("such like already exists");
            }

            try
            {
                _appDbContext.Likes.Add(like);
                await _appDbContext.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw new ForbidException("can not add like");
            }
            
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
