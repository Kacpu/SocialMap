using SocialMap.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Repositories
{
    public interface IPOIAccessRepository
    {
        Task<POIAccess> AddAsync(POIAccess poiAccess);
        Task<POIAccess> GetAsync(int id);
        Task<IEnumerable<POIAccess>> BrowseAllAsync();
        Task UpdateAsync(POIAccess poiAccess);
        Task DelAsync(int id);
    }
}
