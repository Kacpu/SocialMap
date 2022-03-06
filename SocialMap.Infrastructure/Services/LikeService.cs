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
    public class LikeService : ILikeService
    {
        private readonly ILikeRepository _likeRepository;

        public LikeService(ILikeRepository likeRepository)
        {
            _likeRepository = likeRepository;
        }

        public async Task<LikeDTO> AddAsync(LikeDTO like)
        {
            var l = await _likeRepository.AddAsync(ToDomain(like));
            return l != null ? ToDTO(l) : null;
        }

        public async Task<LikeDTO> GetAsync(int id)
        {
            var like = await _likeRepository.GetAsync(id);

            if (like == null)
            {
                return null;
            }

            return ToDTO(like);
        }

        public async Task<IEnumerable<LikeDTO>> BrowseAllAsync()
        {
            var likes = await _likeRepository.BrowseAllAsync();

            if (likes == null)
            {
                return null;
            }

            return likes.Select(c => ToDTO(c));
        }

        public async Task DelAsync(LikeDTO like)
        {
            if (like != null)
            {
                await _likeRepository.DelAsync(ToDomain(like));
            }
        }

        private LikeDTO ToDTO(Like l)
        {
            return new LikeDTO()
            {
                Id = l.Id,
                POIId = l.POIId,
                AppUserId = l.AppUserId,
            };
        }

        private Like ToDomain(LikeDTO lDTO)
        {
            return new Like()
            {
                Id = lDTO.Id,
                POIId = lDTO.POIId,
                AppUserId = lDTO.AppUserId
            };
        }
    }
}
