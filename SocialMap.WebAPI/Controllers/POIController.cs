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
        public async Task<IActionResult> AddPOI([FromBody] CreatePOI poi)
        {
            if (poi == null)
            {
                return BadRequest();
            }

            var p = await _POIService.AddAsync(poi);

            if (p == null)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GetPOI), new { id = p.Id }, p);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPOI(int id)
        {
            POIDTO poiAccessDTO = await _POIService.GetAsync(id);

            if (poiAccessDTO == null)
            {
                return NotFound();
            }

            return Json(poiAccessDTO);
        }

        [HttpGet]
        public async Task<IActionResult> BrowseAllPOI()
        {
            IEnumerable<POIDTO> poiAccessDTO = await _POIService.BrowseAllAsync();

            if (poiAccessDTO == null)
            {
                return NotFound();
            }

            return Json(poiAccessDTO);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePOI(int id)
        {
            POIDTO poiAccessDTO = await _POIService.GetAsync(id);

            if (poiAccessDTO == null)
            {
                return NotFound();
            }

            await _POIService.DelAsync(poiAccessDTO.Id);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePOI([FromBody] UpdatePOI poi, int id)
        {
            POIDTO poiAccessDTO = await _POIService.GetAsync(id);

            if (poiAccessDTO == null)
            {
                return NotFound();
            }

            if (poi == null)
            {
                return BadRequest();
            }

            await _POIService.UpdateAsync(poi);

            return Json(poi);
        }
    }
}
