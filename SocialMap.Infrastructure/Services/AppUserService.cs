using SocialMap.Core.Domain;
using SocialMap.Core.Repositories;
using SocialMap.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public class AppUserService : IAppUserService
    {
        private readonly IAppUserRepository _AppUserRepository;

        public AppUserService(IAppUserRepository AppUserRepository)
        {
            _AppUserRepository = AppUserRepository;
        }

        public async Task<AppUserDTO> GetAsync(string id)
        {
            var u = await _AppUserRepository.GetAsync(id);
            return u != null ? await Task.FromResult(ToDTO(u)) : null;
        }

        public async Task<IEnumerable<AppUserDTO>> BrowseAllAsync()
        {
            var users = await _AppUserRepository.BrowseAllAsync();
            return users != null ? users.Select(u => ToDTO(u)) : null;
        }

        private AppUserDTO ToDTO(AppUser u)
        {
            ICollection<POIDTO> poisDTO = new List<POIDTO>();
            if (u.POIs != null)
            {
                foreach (POI p in u.POIs)
                {
                    poisDTO.Add(new POIDTO
                    {
                        Id = p.Id,
                        Name = p.Name,
                        X = p.X,
                        Y = p.Y,
                        Description = p.Description,
                        IsGlobal = p.IsGlobal,
                        AppUserId = p.AppUserId,
                        CategoryId = p.CategoryId
                    });
                }
            }

            ICollection<POIAccessDTO> poiAccessesDTO = new List<POIAccessDTO>();
            if(u.POIAccesses != null)
            {
                foreach(POIAccess p in u.POIAccesses)
                {
                    poiAccessesDTO.Add(new POIAccessDTO()
                    {
                        Id = p.Id,
                        AppUserId = p.AppUserId,
                        POIId = p.POIId,
                        IsAccpeted = p.IsAccpeted
                    });
                }
            }

            return new AppUserDTO()
            {
                Id = u.Id,
                UserName = u.UserName,
                POIs = poisDTO,
                POIAccesses = poiAccessesDTO
            };
        }
    }
}
