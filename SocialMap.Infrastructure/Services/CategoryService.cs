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
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository CategoryRepository)
        {
            _categoryRepository = CategoryRepository;
        }

        public async Task<CategoryDTO> AddAsync(CreateCategory createCategory)
        {
            var c = await _categoryRepository.AddAsync(createCategory.ToDomain());
            return await Task.FromResult(c.ToDTO());
        }

        public async Task<CategoryDTO> GetAsync(int id)
        {
            var c = await _categoryRepository.GetAsync(id);

            if(c is null)
            {
                throw new NotFoundException("category not found");
            }

            return await Task.FromResult(c.ToDTO());
        }

        public async Task<IEnumerable<CategoryDTO>> BrowseAllAsync(string name)
        {
            var cs = await _categoryRepository.BrowseAllAsync(name);

            return await Task.FromResult(cs.Select(c => c.ToDTO()));
        }

        public async Task<CategoryDTO> UpdateAsync(int id, UpdateCategory updateCategory)
        {
            var c = await _categoryRepository.GetAsync(id);

            if (c is null)
            {
                throw new NotFoundException("category not found");
            }

            var check_c = await _categoryRepository.BrowseAllAsync(updateCategory.Name);
            if (check_c.Any(x => x.Name == updateCategory.Name))
            {
                throw new BadRequestException("such category already exists");
            }

            c.Name = updateCategory.Name;

            await _categoryRepository.UpdateAsync();
            return await Task.FromResult(c.ToDTO());
        }

        public async Task DelAsync(int id)
        {
            var c = await _categoryRepository.GetAsync(id);

            if (c is null)
            {
                throw new NotFoundException("category not found");
            }

            await _categoryRepository.DelAsync(id);
        }
    }
}
