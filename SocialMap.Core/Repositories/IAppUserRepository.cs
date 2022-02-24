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
        Task<AppUser> GetAsync(int id);
        Task<IEnumerable<AppUser>> BrowseAllAsync();
        Task UpdateAsync(AppUser appUser);
        Task DelAsync(AppUser appUser);
    }
}
