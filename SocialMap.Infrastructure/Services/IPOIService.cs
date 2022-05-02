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
        Task<POIDTO> AddAsync(CreatePOI createPOI, int authorId);
        Task<POIDTO> GetAsync(int id);
        Task<IEnumerable<POIDTO>> BrowseAllAsync(int? creatorId = null, bool? IsGlobal = null, bool? IsAccepted = null);
        Task<IEnumerable<POIDTO>> GetAllForUserAsync(int userId);
        Task<POIDTO> UpdateAsync(int id, UpdatePOI updatePoi, int? authorId = null);
        Task DelAsync(int id, int? authId = null);
    }
}
