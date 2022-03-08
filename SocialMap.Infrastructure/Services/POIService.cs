using SocialMap.Core.Domain;
using SocialMap.Core.Repositories;
using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public class POIService : IPOIService
    {
        private readonly IPOIRepository _POIRepository;

        public POIService(IPOIRepository POIRepository)
        {
            _POIRepository = POIRepository;
        }

        private POIDTO ToDTO(POI p)
        {
            ICollection<LikeDTO> likesDTO = new List<LikeDTO>();
            if (p.Likes != null)
            {
                foreach (Like l in p.Likes)
                {
                    likesDTO.Add(new LikeDTO()
                    {
                        Id = l.Id,
                        AppUserId = l.AppUserId,
                        POIId = l.POIId
                    });
                }
            }

            return new POIDTO()
            {
                Id = p.Id,
                Name = p.Name,
                X = p.X,
                Y = p.Y,
                Description = p.Description,
                IsGlobal = p.IsGlobal,
                AppUserId = p.AppUserId,
                CategoryId = p.CategoryId,
                Likes = likesDTO
            };
        }

        private POI ToDomain(POIDTO p)
        {
            return new POI()
            {
                Id = p.Id,
                Name = p.Name,
                X = p.X,
                Y = p.Y,
                Description = p.Description,
                IsGlobal = p.IsGlobal,
                AppUserId = p.AppUserId,
                CategoryId = p.CategoryId
            };
        }

        public async Task<POIDTO> AddAsync(POIDTO poi)
        {
            var z = await _POIRepository.AddAsync(ToDomain(poi));
            return z != null ? await Task.FromResult(ToDTO(z)) : null;
        }

        public async Task<POIDTO> GetAsync(int id)
        {
            var z = await _POIRepository.GetAsync(id);
            return z != null ? await Task.FromResult(ToDTO(z)) : null;
        }

        public async Task<IEnumerable<POIDTO>> BrowseAllAsync()
        {
            var z = await _POIRepository.BrowseAllAsync();
            return z != null ? z.Select(x => ToDTO(x)) : null;
        }

        public async Task DelAsync(int id)
        {
            await _POIRepository.DelAsync(id);
        }

        public async Task UpdateAsync(POIDTO poi)
        {
            await _POIRepository.UpdateAsync(ToDomain(poi));
        }
    }
}

