using SocialMap.Core.Domain;
using SocialMap.Core.Repositories;
using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public class POIAccessService : IPOIAccessService
    {
        private readonly IPOIAccessRepository _POIAccessRepository;

        public POIAccessService(IPOIAccessRepository POIAccessRepository)
        {
            _POIAccessRepository = POIAccessRepository;
        }

        private POIAccessDTO MakeDTO(POIAccess p)
        {
            POIAccessDTO poiDTO = new POIAccessDTO()
            {
                Id = p.Id,
                POIId = p.POIId,
                AppUserId = p.AppUserId,
                IsAccpeted = p.IsAccpeted
            };
            return poiDTO;
        }
        public async Task<POIAccessDTO> AddAsync(CreatePOIAccess poiAccess)
        {
            POIAccess p = new POIAccess()
            {
                Id = poiAccess.Id,
                POIId = poiAccess.POIId,
                AppUserId = poiAccess.AppUserId,
                IsAccpeted = poiAccess.IsAccpeted
            };

            var z = await _POIAccessRepository.AddAsync(p);

            if (z == null)
            {
                return null;
            }
            return MakeDTO(z);
        }

        public async Task<IEnumerable<POIAccessDTO>> BrowseAllAsync()
        {
            var z = await _POIAccessRepository.BrowseAllAsync();
            return z.Select(x => MakeDTO(x));
        }

        public async Task DelAsync(int id)
        {
            await _POIAccessRepository.DelAsync(id);
        }

        public async Task<POIAccessDTO> GetAsync(int id)
        {
            var z = await _POIAccessRepository.GetAsync(id);

            if (z == null)
            {
                return null;
            }
            return MakeDTO(z);
        }

        public async Task UpdateAsync(UpdatePOIAccess poiAccess)
        {
            POIAccess p = new POIAccess()
            {
                POIId = poiAccess.POIId,
                AppUserId = poiAccess.AppUserId,
                IsAccpeted = poiAccess.IsAccpeted
            };

            await _POIAccessRepository.UpdateAsync(p);
        }
    }
}
