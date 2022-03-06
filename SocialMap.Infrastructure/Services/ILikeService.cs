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
        Task<LikeDTO> AddAsync(LikeDTO like);
        Task<LikeDTO> GetAsync(int id);
        Task<IEnumerable<LikeDTO>> BrowseAllAsync();
        //Task UpdateAsync(LikeDTO like);
        Task DelAsync(LikeDTO like);
    }
}
