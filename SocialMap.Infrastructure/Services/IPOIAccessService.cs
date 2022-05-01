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

        Task<POIAccessDTO> AddAsync(CreatePOIAccess poiAccess, int issuerId);
        Task<POIAccessDTO> GetAsync(int id);
        Task<IEnumerable<POIAccessDTO>> GetAllAsync(int? invitedUserId, int? poiId, int? issuerId, bool? isAccepted, int authUserId);
        Task<POIAccessDTO> UpdateAsync(int id, UpdatePOIAccess updatePOIAccess, int authUserId);
        Task DelAsync(int id, int authUserId);
    }
}
