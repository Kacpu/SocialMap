using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public interface ICategoryService
    {
        Task<CategoryDTO> AddAsync(CreateCategory createCategory);
        Task<CategoryDTO> GetAsync(int id);
        Task<IEnumerable<CategoryDTO>> BrowseAllAsync(string name = null);
        Task<CategoryDTO> UpdateAsync(int id, UpdateCategory updateCategory);
        Task DelAsync(int id);
    }
}
