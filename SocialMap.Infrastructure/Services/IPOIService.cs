using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public interface IPOIService
    {
        Task<POIDTO> AddAsync(CreatePOI poi);
        Task<POIDTO> GetAsync(int id);
        Task<IEnumerable<POIDTO>> BrowseAllAsync();
        Task UpdateAsync(UpdatePOI poi);
        Task DelAsync(int id);
    }
}
