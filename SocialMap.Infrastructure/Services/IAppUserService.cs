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
        Task<AppUserDTO> GetAsync(string id);
        Task<IEnumerable<AppUserDTO>> BrowseAllAsync();
    }
}
