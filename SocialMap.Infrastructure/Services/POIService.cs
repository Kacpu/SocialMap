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
    public class POIService : IPOIService
    {
        private readonly IPOIRepository _poiRepository;
        private readonly ICategoryRepository _categoryRepository;

        public POIService(IPOIRepository poiRepository, ICategoryRepository categoryRepository)
        {
            _poiRepository = poiRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<POIDTO> AddAsync(CreatePOI createPOI, int creatorId)
        {
            var p = createPOI.ToDomain();

            p.AppUserId = creatorId;

            var cs = await _categoryRepository.GetByIdsAsync(createPOI.CategoriesId);
            p.Categories = cs.ToList();

            p = await _poiRepository.AddAsync(p);
            return await Task.FromResult(p.ToDTO());
        }

        public async Task<POIDTO> GetAsync(int id)
        {
            var p = await _poiRepository.GetAsync(id);

            if (p is null)
            {
                throw new NotFoundException("poi not found");
            }

            return await Task.FromResult(p.ToDTO());
        }

        public async Task<IEnumerable<POIDTO>> BrowseAllAsync(int? creatorId, bool? IsGlobal, bool? IsAccepted)
        {
            var ps = await _poiRepository.BrowseAllAsync(creatorId, IsGlobal, IsAccepted);

            return await Task.FromResult(ps.Select(x => x.ToDTO()));
        }

        public async Task<IEnumerable<POIDTO>> GetAllForUserAsync(int userId, bool withGlobal, bool withUser, bool withAccessed, bool withInvited)
        {
            var ps = await _poiRepository.BrowseAllForUserAsync(userId, withGlobal, withUser, withAccessed, withInvited);

            return await Task.FromResult(ps.Select(x => x.ToDTO()));
        }

        public async Task<POIDTO> UpdateAsync(int id, UpdatePOI updatePoi, int? authId)
        {
            var p = await _poiRepository.GetAsync(id);

            if(p is null)
            {
                throw new NotFoundException("poi not found");
            }

            if (authId != null && p.AppUserId != authId)
            {
                throw new ForbidException("you do not have permission to change this poi");
            }

            p.Name = !string.IsNullOrEmpty(updatePoi.Name) ? updatePoi.Name : p.Name;
            p.X = updatePoi.X ?? p.X;
            p.Y = updatePoi.Y ?? p.Y;
            p.Description = !string.IsNullOrEmpty(updatePoi.Description) ? updatePoi.Description : p.Description;
            p.IsGlobal = updatePoi.IsGlobal ?? p.IsGlobal;
            p.IsAccepted = updatePoi.IsAccepted ?? p.IsAccepted;

            if (updatePoi.CategoriesId != null)
            {
                var cs = await _categoryRepository.GetByIdsAsync(updatePoi.CategoriesId);
                p.Categories = cs.ToList();
            }

            await _poiRepository.UpdateAsync();
            return await Task.FromResult(p.ToDTO());
        }

        public async Task DelAsync(int id, int? authId)
        {
            var p = await _poiRepository.GetAsync(id);

            if (p is null)
            {
                throw new NotFoundException("poi not found");
            }

            if (authId != null && p.AppUserId != authId)
            {
                throw new ForbidException("you do not have permission to delete this poi");
            }

            await _poiRepository.DelAsync(p.Id);
        }
    }
}