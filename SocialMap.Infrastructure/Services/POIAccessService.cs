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

        private POIAccessDTO ToDTO(POIAccess p)
        {
            return new POIAccessDTO()
            {
                Id = p.Id,
                POIId = p.POIId,
                //AppUserId = p.AppUserId,
                //IsAccpeted = p.IsAccpeted
            };
        }

        private POIAccess ToDomain(POIAccessDTO p)
        {
            return new POIAccess()
            {
                Id = p.Id,
                POIId = p.POIId,
                //AppUserId = p.AppUserId,
                //IsAccpeted = p.IsAccpeted
            };
        }

        public async Task<POIAccessDTO> AddAsync(POIAccessDTO poiAccess)
        {
            var z = await _POIAccessRepository.AddAsync(ToDomain(poiAccess));
            return z != null ? await Task.FromResult(ToDTO(z)) : null;
        }

        public async Task<POIAccessDTO> GetAsync(int id)
        {
            var z = await _POIAccessRepository.GetAsync(id);
            return z != null ? await Task.FromResult(ToDTO(z)) : null;
        }

        public async Task<IEnumerable<POIAccessDTO>> BrowseAllAsync()
        {
            var z = await _POIAccessRepository.BrowseAllAsync();
            return z != null ? z.Select(x => ToDTO(x)) : null;
        }

        public async Task DelAsync(int id)
        {
            await _POIAccessRepository.DelAsync(id);
        }

        public async Task UpdateAsync(POIAccessDTO poiAccess)
        {
            await _POIAccessRepository.UpdateAsync(ToDomain(poiAccess));
        }
    }
}
