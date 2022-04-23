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
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository CategoryRepository)
        {
            _categoryRepository = CategoryRepository;
        }

        public async Task<CategoryDTO> AddAsync(CategoryDTO categoryDTO)
        {
            var c = await _categoryRepository.AddAsync(ToDomain(categoryDTO));
            return c != null ? await Task.FromResult(ToDTO(c)) : null;
        }

        public async Task<CategoryDTO> GetAsync(int id)
        {
            var c = await _categoryRepository.GetAsync(id);
            return c != null ? await Task.FromResult(ToDTO(c)) : null;
        }

        public async Task<IEnumerable<CategoryDTO>> BrowseAllAsync()
        {
            var catgeories = await _categoryRepository.BrowseAllAsync();
            return catgeories != null ? catgeories.Select(c => ToDTO(c)) : null;
        }

        public async Task UpdateAsync(CategoryDTO categoryDTO)
        {
            await _categoryRepository.UpdateAsync(ToDomain(categoryDTO));
        }

        public async Task DelAsync(int id)
        {
            await _categoryRepository.DelAsync(id);
        }

        private CategoryDTO ToDTO(Category c)
        {
            ICollection<POIDTO> poisDTO = new List<POIDTO>();
            if (c.POIs != null)
            {
                foreach(POI p in c.POIs)
                {
                    poisDTO.Add(new POIDTO
                    {
                        Id = p.Id,
                        Name = p.Name,
                        X = p.X,
                        Y = p.Y,
                        Description = p.Description,
                        IsGlobal = p.IsGlobal,
                        //AppUserId = p.AppUserId,
                        //CategoryId = p.CategoryId
                    });
                }
            }

            return new CategoryDTO()
            {
                Id = c.Id,
                Name = c.Name,
                POIs = poisDTO
            };
        }

        private Category ToDomain(CategoryDTO cDTO)
        {
            return new Category()
            {
                Id = cDTO.Id,
                Name = cDTO.Name
            };
        }
    }
}
