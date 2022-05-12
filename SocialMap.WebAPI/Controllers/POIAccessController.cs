using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using SocialMap.Infrastructure.Services;
using SocialMap.WebAPI.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialMap.WebAPI.Controllers
{
    [Route("[Controller]")]
    public class POIAccessController : Controller
    {
        private readonly IPOIAccessService _poiAccessService;

        public POIAccessController(IPOIAccessService POIAccessService)
        {
            _poiAccessService = POIAccessService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPOIAccess([FromBody] CreatePOIAccess poiAccess)
        {
            if (poiAccess == null || poiAccess.POIId == 0 || poiAccess.InvitedUserId == 0)
            {
                return BadRequest();
            }

            var p = await _poiAccessService.AddAsync(poiAccess, User.GetId());

            return CreatedAtAction(nameof(GetPOIAccess), new { id = p.Id }, p);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "SuperUser")]
        public async Task<IActionResult> GetPOIAccess(int id)
        {
            POIAccessDTO pa = await _poiAccessService.GetAsync(id);
            return Json(pa);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllPoiAccesses(int? invitedUserId, int? poiId, int? issuerId, bool? isAccepted)
        {
            IEnumerable<POIAccessDTO> pas = await _poiAccessService.GetAllAsync(invitedUserId, poiId, issuerId, isAccepted);

            foreach (var pa in pas)
            {
                if (User.GetId() != pa.AppUserId && User.GetId() != pa.POIDTO?.CreatorId)
                {
                    return Forbid();
                }
            }

            return Json(pas);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePOIAccess([FromBody] UpdatePOIAccess updatePoiAccess, int id)
        {
            if(updatePoiAccess == null || updatePoiAccess.IsAccepted == null)
            {
                return BadRequest();
            }

            var pa = await _poiAccessService.UpdateAsync(id, updatePoiAccess, User.GetId());
            return Json(pa);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePOIAccess(int id)
        {
            await _poiAccessService.DelAsync(id, User.GetId());

            return NoContent();
        }
    }
}

