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
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _CategoryRepository;
        public CategoryService(ICategoryRepository CategoryRepository)
        {
            _CategoryRepository = CategoryRepository;
        }
        public async Task<CategoryDTO> AddAsync(CategoryDTO categoryDTO)
        {
            var c = new Category()
            {
                Name = categoryDTO.Name,
                POIs = (ICollection<POI>)categoryDTO.POIs
            };
            await _CategoryRepository.AddAsync(c);
            return await Task.FromResult(categoryDTO);
        }

        public async Task<IEnumerable<CategoryDTO>> BrowseAllAsync()
        {
            var z = await _CategoryRepository.BrowseAllAsync();
            return z.Select(c => new CategoryDTO()
            {
                Id = c.Id,
                Name = c.Name,
                POIs = (ICollection<POIDTO>)c.POIs
            });
        }

        public async Task DelAsync(int id)
        {
            await _CategoryRepository.DelAsync(id);
        }

        public async Task<CategoryDTO> GetAsync(int id)
        {
            var z = await _CategoryRepository.GetAsync(id);
            var x = new CategoryDTO()
            {
                Id = z.Id,
                Name = z.Name,
                POIs = (ICollection<POIDTO>)z.POIs,
            };
            return x;
        }

        public async Task UpdateAsync(CategoryDTO categoryDTO)
        {
            Category z = new Category()
            {
                Id = categoryDTO.Id,
                Name = categoryDTO.Name,
                POIs = (ICollection<POI>)categoryDTO.POIs
            };
            await _CategoryRepository.UpdateAsync(z);
        }
    }
}
