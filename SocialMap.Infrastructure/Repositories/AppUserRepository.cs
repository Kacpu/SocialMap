﻿using SocialMap.Core.Domain;
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
        private AppDbContext _appDbContext;
        public AppUserRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<IEnumerable<AppUser>> BrowseAllAsync()
        {
            try
            {
                return await Task.FromResult(_appDbContext.Users);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<AppUser> GetAsync(string id)
        {
            try
            {
                return await Task.FromResult(_appDbContext.Users.FirstOrDefault(c => c.Id == id));
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
