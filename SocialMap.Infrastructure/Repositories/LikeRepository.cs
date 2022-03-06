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
            try
            {
                _appDbContext.Likes.Add(like);
                _appDbContext.SaveChanges();
                return await Task.FromResult(like);
            }
            catch (Exception ex)
            {
                //await Task.FromException(ex);
                return null;
            }
        }

        public async Task<Like> GetAsync(int id)
        {
            return await Task.FromResult(_appDbContext.Likes.FirstOrDefault(l => l.Id == id));
        }

        public async Task<IEnumerable<Like>> BrowseAllAsync()
        {
            return await Task.FromResult(_appDbContext.Likes);
        }

        public async Task DelAsync(Like like)
        {
            try
            {
                _appDbContext.Remove(_appDbContext.Likes.FirstOrDefault(l => l.Id == like.Id));
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
