using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public interface ILikeService
    {
        Task<LikeDTO> AddAsync(CreateLike like);
        Task<LikeDTO> GetAsync(int id);
        Task<IEnumerable<LikeDTO>> BrowseAllAsync(int? userId = null, int? poiId = null);
        Task DelAsync(int id, int? authId = null);
    }
}
