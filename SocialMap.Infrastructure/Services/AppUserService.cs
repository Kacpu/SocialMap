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
        public async Task<IEnumerable<AppUserDTO>> BrowseAllAsync()
        {
            var z = await _AppUserRepository.BrowseAllAsync();
            return z.Select(c => new AppUserDTO()
            {
                Id = c.Id,
                UserName = c.UserName,
                POIs = (ICollection<POIDTO>)c.POIs
            });
        }

        public async Task<AppUserDTO> GetAsync(string id)
        {
            var z = await _AppUserRepository.GetAsync(id);
            var x = new AppUserDTO()
            {
                Id = z.Id,
                UserName = z.UserName,
                POIs = (ICollection<POIDTO>)z.POIs
            };
            return x;
        }
    }
}
