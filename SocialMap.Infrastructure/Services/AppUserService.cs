using LinqKit;
using SocialMap.Core.Domain;
using SocialMap.Core.Repositories;
using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using SocialMap.Infrastructure.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
            if(createUser.Record is null)
            {
                throw new BadRequestException("record is null");
            }

            var check_u = await _appUserRepository.GetAsync(x => x.UserfrontId == createUser.Record.UserUuid
                || x.EmailAddress == createUser.Record.Email);

            if (check_u != null)
            {
                throw new BadRequestException("such app user already exists");
            }

            var u = createUser.ToDomain();
            u = await _appUserRepository.AddAsync(u);
            return await Task.FromResult(u.ToDTO());
        }

        public async Task<AppUserDTO> GetAsync(int? id, string uuid)
        {
            Expression<Func<AppUser, bool>> filter = x => false;

            if(id != null)
            {
                filter = x => x.Id == id;
            }
            else if (!string.IsNullOrEmpty(uuid))
            {
                filter = x => x.UserfrontId == uuid;
            }

            var u = await _appUserRepository.GetAsync(filter);

            if (u is null)
            {
                throw new NotFoundException("user not found");
            }

            return await Task.FromResult(u.ToDTO());
        }

        public async Task<IEnumerable<AppUserDTO>> GetAllAsync(string searchInput)
        {
            if (searchInput == null)
            {
                searchInput = "";
            }

            Expression<Func<AppUser, bool>> filter = x => x.UserName.Contains(searchInput) || x.EmailAddress.Contains(searchInput);
            
            var users = await _appUserRepository.GetAllAsync(filter);

            return await Task.FromResult(users.Select(u => u.ToDTO()));
        }
    }
}
