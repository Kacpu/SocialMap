using SocialMap.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Repositories
{
    public interface ILikeRepository
    {
        Task<Like> AddAsync(Like like);
        Task<Like> GetAsync(int id);
        Task<IEnumerable<Like>> BrowseAllAsync();
        //Task UpdateAsync(Like like);
        Task DelAsync(Like like);
    }
}
