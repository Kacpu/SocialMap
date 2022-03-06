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
    public class POIAccessController : Controller
    {
        private readonly IPOIAccessService _POIAccessService;

        public POIAccessController(IPOIAccessService POIAccessService)
        {
            _POIAccessService = POIAccessService;
        }

        [HttpPost]
        public async Task<IActionResult> AddPOIAccess([FromBody] CreatePOIAccess poi)
        {
            if (poi == null)
            {
                return BadRequest();
            }

            POIAccessDTO poiDTO = new POIAccessDTO()
            {
                Id = poi.Id,
                POIId = poi.POIId,
                AppUserId = poi.AppUserId,
                IsAccpeted = poi.IsAccpeted
            };

            var p = await _POIAccessService.AddAsync(poiDTO);

            if (p == null)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GetPOIAccess), new { id = p.Id }, p);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPOIAccess(int id)
        {
            POIAccessDTO poiAccessDTO = await _POIAccessService.GetAsync(id);

            if (poiAccessDTO == null)
            {
                return NotFound();
            }

            return Json(poiAccessDTO);
        }

        [HttpGet]
        public async Task<IActionResult> BrowseAllPOIAccess()
        {
            IEnumerable<POIAccessDTO> poiAccessDTO = await _POIAccessService.BrowseAllAsync();

            if (poiAccessDTO == null)
            {
                return NotFound();
            }

            return Json(poiAccessDTO);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePOIAccess(int id)
        {
            POIAccessDTO poiAccessDTO = await _POIAccessService.GetAsync(id);

            if (poiAccessDTO == null)
            {
                return NotFound();
            }

            await _POIAccessService.DelAsync(poiAccessDTO.Id);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePOIAccess([FromBody] UpdatePOIAccess poi, int id)
        {
            POIAccessDTO poiAccessDTO = await _POIAccessService.GetAsync(id);

            if (poiAccessDTO == null)
            {
                return NotFound();
            }

            if (poi == null)
            {
                return BadRequest();
            }

            POIAccessDTO poiDTO = new POIAccessDTO()
            {
                Id = id,
                POIId = poi.POIId,
                AppUserId = poi.AppUserId,
                IsAccpeted = poi.IsAccpeted
            };

            await _POIAccessService.UpdateAsync(poiDTO);

            return Json(poi);
        }
    }
}

