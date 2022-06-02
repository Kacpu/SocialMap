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
    public class LikeController : Controller
    {
        private readonly ILikeService _likeService;

        public LikeController(ILikeService likeService)
        {
            _likeService = likeService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddLike([FromBody] CreateLike like)
        {
            if (like == null || like.PoiId == 0)
            {
                return BadRequest();
            }

            like.AppUserId = User.GetId();

            var l = await _likeService.AddAsync(like);

            return CreatedAtAction(nameof(GetLike), new { id = l.Id }, l);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetLike(int id)
        {
            LikeDTO l = await _likeService.GetAsync(id);

            if (l.AppUserId != User.GetId() && !User.IsAdmin() && !User.IsMod())
            {
                return Forbid();
            }

            return Json(l);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> BrowseAllLikes(int? poiId)
        {
            IEnumerable<LikeDTO> ls = await _likeService.BrowseAllAsync(User.GetId(), poiId);
            return Json(ls);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteLike(int id)
        {
            int? authorId = User.IsAdmin() || User.IsMod() ? null : User.GetId();
            await _likeService.DelAsync(id, authorId);

            return NoContent();
        }
    }
}
