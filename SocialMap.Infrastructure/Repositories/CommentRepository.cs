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
        private AppDbContext _appDbContext;

        public CommentRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Comment> AddAsync(Comment comment)
        {
            try
            {
                _appDbContext.Comments.Add(comment);
                _appDbContext.SaveChanges();
                return await Task.FromResult(comment);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Comment> GetAsync(int id)
        {
            return await Task.FromResult(_appDbContext.Comments.Include(c => c.AppUser).FirstOrDefault(c => c.Id == id));
        }

        public async Task<IEnumerable<Comment>> BrowseAllAsync()
        {
            return await Task.FromResult(_appDbContext.Comments.Include(c => c.AppUser).OrderByDescending(c => c.PublicationDate));
        }

        public async Task UpdateAsync(Comment comment)
        {
            try
            {
                var cToUpdate = _appDbContext.Comments.FirstOrDefault(c => c.Id == comment.Id);

                cToUpdate.Content = comment.Content;

                _appDbContext.SaveChanges();
                await Task.CompletedTask;
            }
            catch (Exception ex)
            {
                await Task.FromException(ex);
            }
        }

        public async Task DelAsync(Comment comment)
        {
            try
            {
                _appDbContext.Remove(_appDbContext.Comments.FirstOrDefault(c => c.Id == comment.Id));
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
