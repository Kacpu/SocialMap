using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public interface IPOIAccessService
    {

        Task<POIAccessDTO> AddAsync(POIAccessDTO poiAccess);
        Task<POIAccessDTO> GetAsync(int id);
        Task<IEnumerable<POIAccessDTO>> BrowseAllAsync();
        Task UpdateAsync(POIAccessDTO poiAccess);
        Task DelAsync(int id);
    }
}
