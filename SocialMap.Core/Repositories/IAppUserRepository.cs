using SocialMap.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Repositories
{
    public interface IAppUserRepository
    {
        Task<AppUser> AddAsync(AppUser user);
        Task<AppUser> GetAsync(Expression<Func<AppUser, bool>> filter);
        Task<IEnumerable<AppUser>> GetAllAsync(Expression<Func<AppUser, bool>> filter);
        //Task UpdateAsync(AppUser appUser);
        //Task DelAsync(AppUser appUser);
    }
}
