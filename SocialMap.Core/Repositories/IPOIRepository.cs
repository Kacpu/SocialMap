using SocialMap.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Repositories
{
    public interface IPOIRepository
    {
        Task<POI> AddAsync(POI poi);
        Task<POI> GetAsync(int id);
        Task<IEnumerable<POI>> BrowseAllAsync();
        Task UpdateAsync(POI poi);
        Task DelAsync(int id);
    }
}
