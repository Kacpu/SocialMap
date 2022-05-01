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
        Task<IEnumerable<POIAccess>> BrowseAllAsync(int? invitedUserId= null, int? poiId = null, int? issuerId = null, bool? isAccepted = null);
        Task UpdateAsync();
        Task DelAsync(int id);
    }
}
