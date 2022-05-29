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
    public class LikeService : ILikeService
    {
        private readonly ILikeRepository _likeRepository;
        private readonly IPOIRepository _poiRepository;

        public LikeService(ILikeRepository likeRepository, IPOIRepository poiRepository)
        {
            _likeRepository = likeRepository;
            _poiRepository = poiRepository;
        }

        public async Task<LikeDTO> AddAsync(CreateLike createLike)
        {
            var poi = await _poiRepository.GetAsync(createLike.PoiId);

            if (poi is null)
            {
                throw new BadRequestException("liked poi not found");
            }

            if(poi.AppUserId == createLike.AppUserId)
            {
                throw new BadRequestException("issuer can not be liked poi creator");
            }

            var l = await _likeRepository.AddAsync(createLike.ToDomain());
            return await Task.FromResult(l.ToDTO());
        }

        public async Task<LikeDTO> GetAsync(int id)
        {
            var like = await _likeRepository.GetAsync(id);

            if (like == null)
            {
                throw new NotFoundException("like not found");
            }

            return await Task.FromResult(like.ToDTO());
        }

        public async Task<IEnumerable<LikeDTO>> BrowseAllAsync(int? userId, int? poiId)
        {
            var likes = await _likeRepository.BrowseAllAsync(userId, poiId);

            return await Task.FromResult(likes.Select(x => x.ToDTO()));
        }

        public async Task DelAsync(int id, int? authId)
        {
            var l = await _likeRepository.GetAsync(id);

            if (l is null)
            {
                throw new NotFoundException("like not found");
            }

            if (authId != null && l.AppUserId != authId)
            {
                throw new ForbidException("you do not have permission to delete this like");
            }

            await _likeRepository.DelAsync(l.Id);
        }
    }
}
