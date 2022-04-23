using SocialMap.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Repositories
{
    public interface IAppUserRepository
    {
        Task<AppUser> AddAsync(AppUser user);
        Task<AppUser> GetAsync(int id);
        Task<AppUser> GetByUuidAsync(string uuid);
        Task<IEnumerable<AppUser>> GetAllAsync();
        //Task UpdateAsync(AppUser appUser);
        //Task DelAsync(AppUser appUser);
    }
}
