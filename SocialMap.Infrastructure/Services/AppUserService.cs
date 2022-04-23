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
    public class AppUserService : IAppUserService
    {
        private readonly IAppUserRepository _appUserRepository;

        public AppUserService(IAppUserRepository AppUserRepository)
        {
            _appUserRepository = AppUserRepository;
        }

        public async Task<AppUserDTO> AddAsync(CreateAppUser createUser)
        {
            var u = createUser.ToDomain();
            u = await _appUserRepository.AddAsync(u);
            return await Task.FromResult(u.ToDTO());
        }

        public async Task<AppUserDTO> GetAsync(int id)
        {
            var u = await _appUserRepository.GetAsync(id);

            if (u is null)
                throw new NotFoundException("user not found");

            return await Task.FromResult(u.ToDTO());
        }

        public async Task<AppUserDTO> GetByUuidAsync(string uuid)
        {
            var u = await _appUserRepository.GetByUuidAsync(uuid);

            if (u is null)
                throw new NotFoundException("user not found");

            return await Task.FromResult(u.ToDTO());
        }

        public async Task<IEnumerable<AppUserDTO>> GetAllAsync()
        {
            var users = await _appUserRepository.GetAllAsync();
            return await Task.FromResult(users.Select(u => u.ToDTO()));
        }
    }
}
