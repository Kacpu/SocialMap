using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using SocialMap.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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

        [HttpGet]
        public async Task<IActionResult> BrowseAllAsync()
        {
            IEnumerable<CategoryDTO> z = await _categoryService.BrowseAllAsync();

            if (z == null)
            {
                return NotFound();
            }

            return Json(z);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int id)
        {

            CategoryDTO z = await _categoryService.GetAsync(id);

            if (z == null)
            {
                return NotFound();
            }


            return Json(z);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddCategory([FromBody] CreateCategory createCategory)
        {
            if (createCategory == null)
            {
                return BadRequest();
            }

            CategoryDTO categoryDTO = new CategoryDTO()
            {
                Name = createCategory.Name
            };

            var c = await _categoryService.AddAsync(categoryDTO);

            if (c == null)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GetCategory), new { id = c.Id }, c);
        }

        [HttpPut("{id}")]
        [Authorize]
        //mod
        public async Task<IActionResult> UpdateCategory([FromBody] UpdateCategory updateCategory, int id)
        {
            CategoryDTO categoryDTO = await _categoryService.GetAsync(id);

            if (categoryDTO == null)
            {
                return NotFound();
            }

            if (updateCategory == null)
            {
                return BadRequest();
            }

            categoryDTO.Name = updateCategory.Name ?? categoryDTO.Name;

            await _categoryService.UpdateAsync(categoryDTO);

            return Json(categoryDTO);
        }

        [HttpDelete("{id}")]
        [Authorize]
        //mod
        public async Task<IActionResult> DeleteCategory(int id)
        {
            CategoryDTO categoryDTO = await _categoryService.GetAsync(id);

            if (categoryDTO == null)
            {
                return NotFound();
            }

            await _categoryService.DelAsync(id);

            return Ok();
        }
    }
}
