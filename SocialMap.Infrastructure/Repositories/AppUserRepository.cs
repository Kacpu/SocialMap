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
            try
            {
                _appDbContext.AppUsers.Add(user);
                await _appDbContext.SaveChangesAsync();
                return await Task.FromResult(user);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<AppUser> GetAsync(int id)
        {
            try
            {
                return await Task.FromResult(await _appDbContext.AppUsers.FirstOrDefaultAsync(x => x.Id == id));
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<AppUser> GetByUuidAsync(string uuid)
        {
            try
            {
                return await Task.FromResult(await _appDbContext.AppUsers.FirstOrDefaultAsync(x => x.UserfrontId == uuid));
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<IEnumerable<AppUser>> GetAllAsync()
        {
            try
            {
                return await Task.FromResult(_appDbContext.AppUsers.AsEnumerable());
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
