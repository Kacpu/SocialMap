using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public interface IAppUserService
    {
        Task<AppUserDTO> AddAsync(CreateAppUser user);
        Task<AppUserDTO> GetAsync(int? id = null, string uuid = null);
        Task<IEnumerable<AppUserDTO>> GetAllAsync(string searchInput);
    }
}
