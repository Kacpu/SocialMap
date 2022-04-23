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
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _appDbContext;

        public CommentRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Comment> AddAsync(Comment comment)
        {
            _appDbContext.Comments.Add(comment);
            await _appDbContext.SaveChangesAsync();
            return await Task.FromResult(comment);
        }

        public async Task<Comment> GetAsync(int id)
        {
            var c = await _appDbContext.Comments.Include(x => x.AppUser).FirstOrDefaultAsync(x => x.Id == id);
            return await Task.FromResult(c);
        }

        public async Task<IEnumerable<Comment>> GetAllAsync(int? userId, int? poiId)
        {
            var c = _appDbContext.Comments.AsQueryable();

            if(userId != null)
            {
                c = c.Where(x => x.AppUserId == userId);
            }

            if(poiId != null)
            {
                c = c.Where(x => x.POIId == poiId);
            }

            c = c.Include(c => c.AppUser).OrderByDescending(c => c.PublicationDate);

            return await Task.FromResult(c);
        }

        public async Task UpdateAsync()
        {
             await _appDbContext.SaveChangesAsync();
        }

        public async Task DelAsync(int id)
        {
            _appDbContext.Remove(_appDbContext.Comments.FirstOrDefault(c => c.Id == id));
            await _appDbContext.SaveChangesAsync();
        }
    }
}
