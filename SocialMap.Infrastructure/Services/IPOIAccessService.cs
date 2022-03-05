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

        Task<POIAccessDTO> AddAsync(CreatePOIAccess poiAccess);
        Task<POIAccessDTO> GetAsync(int id);
        Task<IEnumerable<POIAccessDTO>> BrowseAllAsync();
        Task UpdateAsync(UpdatePOIAccess poiAccess);
        Task DelAsync(int id);
    }
}
