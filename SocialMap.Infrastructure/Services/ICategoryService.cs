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
        Task<CategoryDTO> AddAsync(CategoryDTO categoryDTO);
        Task<CategoryDTO> GetAsync(int id);
        Task<IEnumerable<CategoryDTO>> BrowseAllAsync();
        Task UpdateAsync(CategoryDTO categoryDTO);
        Task DelAsync(int id);
    }
}
