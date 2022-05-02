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
        Task<IEnumerable<POI>> BrowseAllAsync(int? creatorId = null, bool? IsGlobal = null, bool? IsAccepted = null);
        Task<IEnumerable<POI>> GetAllAccessedAsync(int userId);
        Task UpdateAsync();
        Task DelAsync(int id);
    }
}
