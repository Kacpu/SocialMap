using SocialMap.Core.Domain;
using SocialMap.Core.Repositories;
using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using SocialMap.Infrastructure.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public class POIAccessService : IPOIAccessService
    {
        private readonly IPOIAccessRepository _poiAccessRepository;
        private readonly IPOIRepository _poiRepository;
        private readonly IAppUserRepository _appUserRepository;

        public POIAccessService(IPOIAccessRepository poiAccessRepository, IPOIRepository poiRepository, IAppUserRepository appUserRepository)
        {
            _poiAccessRepository = poiAccessRepository;
            _poiRepository = poiRepository;
            _appUserRepository = appUserRepository;
        }

        public async Task<POIAccessDTO> AddAsync(CreatePOIAccess createPoiAccess, int issuerId)
        {
            var poi = await _poiRepository.GetAsync(createPoiAccess.POIId);

            if (poi is null)
            {
                throw new BadRequestException("poi was not found");
            }

            if (poi.AppUserId != issuerId)
            {
                throw new ForbidException("you are not an author of poi");
            }

            var user = await _appUserRepository.GetAsync(createPoiAccess.InvitedUserId);

            if (user is null)
            {
                throw new BadRequestException("invited user was not found");
            }

            if (poi.AppUserId == createPoiAccess.InvitedUserId)
            {
                throw new BadRequestException("issuer can not be invited user");
            }

            var check_pa = await _poiAccessRepository.BrowseAllAsync(invitedUserId: createPoiAccess.InvitedUserId, poiId: createPoiAccess.POIId);
            if(check_pa.Any())
            {
                throw new BadRequestException("such poi access already exists");
            }

            var pa = await _poiAccessRepository.AddAsync(createPoiAccess.ToDomain());
            return await Task.FromResult(pa.ToDTO());
        }

        public async Task<POIAccessDTO> GetAsync(int id)
        {
            var pa = await _poiAccessRepository.GetAsync(id);

            if(pa is null)
            {
                throw new NotFoundException("poi access not found");
            }

            return await Task.FromResult(pa.ToDTO());
        }

        public async Task<IEnumerable<POIAccessDTO>> GetAllAsync(int? invitedUserId, int? poiId, int? issuerId, bool? isAccepted)
        {
            var pas = await _poiAccessRepository.BrowseAllAsync(invitedUserId, poiId, issuerId, isAccepted);

            return await Task.FromResult(pas.Select(c => c.ToDTO()));
        }

        public async Task<POIAccessDTO> UpdateAsync(int poiAccessId, UpdatePOIAccess updatePOIAccess, int authUserId)
        {
            var pa = await _poiAccessRepository.GetAsync(poiAccessId);

            if (pa is null)
                throw new NotFoundException("poi access not found");

            if (pa.AppUserId != authUserId && pa.POI?.AppUserId != authUserId)
                throw new ForbidException("you do not have permission to change this poi access");

            pa.IsAccepted = updatePOIAccess.IsAccepted ?? pa.IsAccepted;

            await _poiAccessRepository.UpdateAsync();
            return await Task.FromResult(pa.ToDTO());
        }

        public async Task DelAsync(int id, int authUserId)
        {
            var pa = await _poiAccessRepository.GetAsync(id);

            if(pa is null)
            {
                throw new NotFoundException("poi access not found");
            }

            if (pa.AppUserId != authUserId && pa.POI?.AppUserId != authUserId)
            {
                throw new ForbidException("you do not have permission to delete this poi access");
            }

            await _poiAccessRepository.DelAsync(pa.Id);
        }
    }
}
