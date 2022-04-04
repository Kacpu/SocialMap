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
    public class POIController : Controller
    {
        private readonly IPOIService _POIService;

        public POIController(IPOIService POIService)
        {
            _POIService = POIService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPOI([FromBody] CreatePOI poi)
        {
            if (poi == null)
            {
                return BadRequest();
            }

            POIDTO poiDTO = new POIDTO()
            {
                Name = poi.Name,
                X = poi.X,
                Y = poi.Y,
                Description = poi.Description,
                IsGlobal = poi.IsGlobal,
                AppUserId = poi.AppUserId,
                CategoryId = poi.CategoryId
            };

            var p = await _POIService.AddAsync(poiDTO);

            if (p == null)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GetPOI), new { id = p.Id }, p);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPOI(int id)
        {
            POIDTO poiDTO = await _POIService.GetAsync(id);

            if (poiDTO == null)
            {
                return NotFound();
            }

            return Json(poiDTO);
        }

        [HttpGet]
        public async Task<IActionResult> BrowseAllPOI()
        {
            IEnumerable<POIDTO> poisDTO = await _POIService.BrowseAllAsync();

            if (poisDTO == null)
            {
                return NotFound();
            }

            return Json(poisDTO);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePOI(int id)
        {
            POIDTO poiDTO = await _POIService.GetAsync(id);

            if (poiDTO == null)
            {
                return NotFound();
            }

            await _POIService.DelAsync(poiDTO.Id);

            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePOI([FromBody] UpdatePOI poi, int id)
        {
            POIDTO poiDTO = await _POIService.GetAsync(id);

            if (poiDTO == null)
            {
                return NotFound();
            }

            if (poi == null)
            {
                return BadRequest();
            }

            poiDTO.Name = poi.Name ?? poiDTO.Name;
            poiDTO.X = poi.X;
            poiDTO.Y = poi.Y;
            poiDTO.Description = poi.Description ?? poiDTO.Description;
            poiDTO.IsGlobal = poi.IsGlobal;
            poiDTO.CategoryId = poi.CategoryId;

            await _POIService.UpdateAsync(poiDTO);

            return Json(poiDTO);
        }
    }
}
