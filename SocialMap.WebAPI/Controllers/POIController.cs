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
    [ApiController]
    [Route("[Controller]")]
    public class POIController : Controller
    {
        private readonly IPOIService _poiService;
        private readonly IPOIAccessService _poiAccessService;

        public POIController(IPOIService poiService, IPOIAccessService poiAccessService)
        {
            _poiService = poiService;
            _poiAccessService = poiAccessService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPOI([FromBody] CreatePOI createPoi)
        {
            if (createPoi == null || string.IsNullOrEmpty(createPoi.Name) || createPoi.X == 0 || createPoi.Y == 0)
            {
                return BadRequest();
            }
           
            var p = await _poiService.AddAsync(createPoi, User.GetId());

            return CreatedAtAction(nameof(GetPOI), new { id = p.Id }, p);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPOI(int id)
        {
            POIDTO p = await _poiService.GetAsync(id);

            if((!p.IsGlobal || !p.IsAccepted) && (!User.IsAdmin() && !User.IsMod()) && p.CreatorId != User.GetId())
            {
                var perm = await _poiAccessService.GetAllAsync(poiId: p.Id, invitedUserId: User.GetId());
                if (!perm.Any())
                {
                    return Forbid();
                }
            }

            return Json(p);
        }

        [HttpGet]
        public async Task<IActionResult> BrowseAllPOI(int? creatorId, bool? isGlobal, bool? isAccepted)
        {
            IEnumerable<POIDTO> poisDTO;

            if (User.IsAdmin() || User.IsMod())
            {
                poisDTO = await _poiService.BrowseAllAsync(creatorId, isGlobal, isAccepted);
            }
            else
            {
                poisDTO = await _poiService.BrowseAllAsync(IsGlobal: true, IsAccepted: true);
            }

            return Json(poisDTO);
        }

        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> BrowseAllPoiForUser(bool withGlobal, bool withUser, bool withAccessed, bool withInvited)
        {
            IEnumerable<POIDTO> poisDTO;

            poisDTO = await _poiService.GetAllForUserAsync(User.GetId(), withGlobal, withUser, withAccessed, withInvited);

            return Json(poisDTO);
            
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePOI([FromBody] UpdatePOI updatePoi, int id)
        {
            if (updatePoi == null)
            {
                return BadRequest();
            }

            int? authorId = User.IsAdmin() || User.IsMod() ? null : User.GetId();
            var p = await _poiService.UpdateAsync(id, updatePoi, authorId);

            return Json(p);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePOI(int id)
        {
            int? authorId = User.IsAdmin() || User.IsMod() ? null : User.GetId();
            await _poiService.DelAsync(id, authorId);

            return NoContent();
        }
    }
}
