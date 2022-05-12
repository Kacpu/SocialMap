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

        public async Task<AppUser> GetAsync(int id)
        {
            var u = await _appDbContext.AppUsers.FirstOrDefaultAsync(x => x.Id == id);
            return await Task.FromResult(u);
        }

        public async Task<AppUser> GetByUuidAsync(string uuid)
        {
            var u = await _appDbContext.AppUsers.FirstOrDefaultAsync(x => x.UserfrontId == uuid);
            return await Task.FromResult(u);
        }

        public async Task<IEnumerable<AppUser>> GetAllAsync()
        {
            var us = _appDbContext.AppUsers;
            return await Task.FromResult(us);
        }
    }
}
