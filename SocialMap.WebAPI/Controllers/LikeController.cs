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
    public class LikeController : Controller
    {
        private readonly ILikeService _likeService;

        public LikeController(ILikeService likeService)
        {
            _likeService = likeService;
        }

        [HttpPost]
        public async Task<IActionResult> AddLike([FromBody] CreateLike like)
        {
            if (like == null)
            {
                return BadRequest();
            }

            LikeDTO likeDTO = new LikeDTO()
            {
                POIId = like.POIId,
                AppUserId = like.AppUserId
            };

            var l = await _likeService.AddAsync(likeDTO);

            if (l == null)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GetLike), new { id = l.Id }, l);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetLike(int id)
        {
            LikeDTO likeDTO = await _likeService.GetAsync(id);

            if (likeDTO == null)
            {
                return NotFound();
            }

            return Json(likeDTO);
        }

        [HttpGet]
        public async Task<IActionResult> BrowseAllLikes()
        {
            IEnumerable<LikeDTO> likesDTO = await _likeService.BrowseAllAsync();

            if (likesDTO == null)
            {
                return NotFound();
            }

            return Json(likesDTO);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLike(int id)
        {
            LikeDTO likeDTO = await _likeService.GetAsync(id);

            if (likeDTO == null)
            {
                return NotFound();
            }

            await _likeService.DelAsync(likeDTO);

            return Ok();
        }
    }
}
