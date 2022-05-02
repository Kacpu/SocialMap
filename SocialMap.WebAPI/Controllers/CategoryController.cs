using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialMap.Infrastructure.Commands;
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
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService CategoryService)
        {
            _categoryService = CategoryService;
        }

        [HttpPost]
        [Authorize(Policy = "SuperUser")]
        public async Task<IActionResult> AddCategory([FromBody] CreateCategory createCategory)
        {
            if (createCategory == null || string.IsNullOrEmpty(createCategory.Name))
            {
                return BadRequest();
            }

            var c = await _categoryService.AddAsync(createCategory);

            return CreatedAtAction(nameof(GetCategory), new { id = c.Id }, c);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {
            CategoryDTO c = await _categoryService.GetAsync(id);
            return Json(c);
        }

        [HttpGet]
        public async Task<IActionResult> BrowseAllAsync(string name)
        {
            IEnumerable<CategoryDTO> cs = await _categoryService.BrowseAllAsync(name);
            return Json(cs);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "SuperUser")]
        public async Task<IActionResult> UpdateCategory([FromBody] UpdateCategory updateCategory, int id)
        {
            if (updateCategory == null | string.IsNullOrEmpty(updateCategory.Name))
            {
                return BadRequest();
            }

            var c = await _categoryService.UpdateAsync(id, updateCategory);

            return Json(c);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "SuperUser")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            await _categoryService.DelAsync(id);

            return NoContent();
        }
    }
}
