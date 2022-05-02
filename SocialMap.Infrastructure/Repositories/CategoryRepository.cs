using Microsoft.EntityFrameworkCore;
using SocialMap.Core.Domain;
using SocialMap.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _appDbContext;

        public CategoryRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Category> AddAsync(Category category)
        {
            _appDbContext.Category.Add(category);
            await _appDbContext.SaveChangesAsync();
            return await Task.FromResult(category);
        }

        public async Task<Category> GetAsync(int id)
        {
            var c = await _appDbContext.Category.FirstOrDefaultAsync(x => x.Id == id);

            return await Task.FromResult(c);
        }

        public async Task<IEnumerable<Category>> BrowseAllAsync(string name)
        {
            var cs = _appDbContext.Category.AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                cs = cs.Where(x => x.Name.Contains(name) || name.Contains(x.Name));
            }

             return await Task.FromResult(cs);
        }

        public async Task<IEnumerable<Category>> GetByIdsAsync(List<int> ids)
        {
            if (ids != null)
            {
                var c = _appDbContext.Category.Where(c => ids.Any(id => id == c.Id));
                return await Task.FromResult(c);
            }
            else
            {
                return await Task.FromResult(new List<Category>());
            }
        }

        public async Task UpdateAsync()
        {
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DelAsync(int id)
        {
            var c = await _appDbContext.Category.FirstOrDefaultAsync(c => c.Id == id);
            _appDbContext.Category.Remove(c);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
