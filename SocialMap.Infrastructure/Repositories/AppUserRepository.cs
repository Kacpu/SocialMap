using Microsoft.EntityFrameworkCore;
using SocialMap.Core.Domain;
using SocialMap.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Repositories
{
    public class AppUserRepository : IAppUserRepository
    {
        private readonly AppDbContext _appDbContext;
        public AppUserRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<AppUser> AddAsync(AppUser user)
        {
            _appDbContext.AppUsers.Add(user);
            await _appDbContext.SaveChangesAsync();
            return await Task.FromResult(user);
        }

        public async Task<AppUser> GetAsync(Expression<Func<AppUser, bool>> filter)
        {
            var u = await _appDbContext.AppUsers.FirstOrDefaultAsync(filter);
            return await Task.FromResult(u);
        }

        public async Task<IEnumerable<AppUser>> GetAllAsync(Expression<Func<AppUser, bool>> filter)
        {
            var us = _appDbContext.AppUsers.Where(filter);
            return await Task.FromResult(us);
        }
    }
}
