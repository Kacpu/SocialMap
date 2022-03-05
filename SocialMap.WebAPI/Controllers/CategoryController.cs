using Microsoft.AspNetCore.Mvc;
using SocialMap.Infrastructure.DTO;
using SocialMap.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialMap.WebAPI.Controllers
{
    [Route("[Controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _CategoryService;
        public CategoryController(ICategoryService CategoryService)
        {
            _CategoryService = CategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> BrowseAllAsync()
        {
            IEnumerable<CategoryDTO> z = await _CategoryService.BrowseAllAsync();
            return Json(z);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDirector(int id)
        {
            CategoryDTO z = await _CategoryService.GetAsync(id);
            return Json(z);
        }

        [HttpPost]
        public async Task AddDirector([FromBody] CategoryDTO categoryDTO)
        {
            await _CategoryService.AddAsync(categoryDTO);
        }

        [HttpPut("{id}")]
        public async Task UpdateCompetitor([FromBody] CategoryDTO categoryDTO)
        {
            await _CategoryService.UpdateAsync(categoryDTO);
        }

        [HttpDelete("{id}")]
        public async Task DeleteDirector(int id)
        {
            await _CategoryService.DelAsync(id);
        }
    }
}
