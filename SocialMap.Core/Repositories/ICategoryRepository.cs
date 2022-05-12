using SocialMap.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Repositories
{
    public interface ICategoryRepository
    {
        Task<Category> AddAsync(Category category);
        Task<Category> GetAsync(int id);
        Task<IEnumerable<Category>> BrowseAllAsync(string name = null);
        Task<IEnumerable<Category>> GetByIdsAsync(List<int> ids);
        Task UpdateAsync();
        Task DelAsync(int id);
    }
}
