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

        private POIDTO MakeDTO(POI p)
        {
            POIDTO poiDTO = new POIDTO()
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
            return poiDTO;
        }

        public async Task<POIDTO> AddAsync(POIDTO poi)
        {
            POI p = new POI()
            {
                Id = poi.Id,
                Name = poi.Name,
                X = poi.X,
                Y = poi.Y,
                Description = poi.Description,
                IsGlobal = poi.IsGlobal,
                AppUserId = poi.AppUserId,
                CategoryId = poi.CategoryId
            };

            var z = await _POIRepository.AddAsync(p);

            if (z == null)
            {
                return null;
            }
            return MakeDTO(z);
        }

        public async Task<IEnumerable<POIDTO>> BrowseAllAsync()
        {
            var z = await _POIRepository.BrowseAllAsync();
            return z.Select(x => MakeDTO(x));
        }

        public async Task DelAsync(int id)
        {
            await _POIRepository.DelAsync(id);
        }

        public async Task<POIDTO> GetAsync(int id)
        {
            var z = await _POIRepository.GetAsync(id);

            if (z == null)
            {
                return null;
            }
            return MakeDTO(z);
        }

        public async Task UpdateAsync(POIDTO poi)
        {
            POI p = new POI()
            {
                Name = poi.Name,
                X = poi.X,
                Y = poi.Y,
                Description = poi.Description,
                IsGlobal = poi.IsGlobal,
                AppUserId = poi.AppUserId,
                CategoryId = poi.CategoryId
            };

            await _POIRepository.UpdateAsync(p);
        }
    }
    }

