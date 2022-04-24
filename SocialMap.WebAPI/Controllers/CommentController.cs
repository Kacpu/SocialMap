using Microsoft.AspNetCore.Mvc;
using SocialMap.Infrastructure.DTO;
using SocialMap.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocialMap.Infrastructure.Commands;
using Microsoft.AspNetCore.Authorization;
using SocialMap.WebAPI.Extensions;

namespace SocialMap.WebAPI.Controllers
{
    [Route("[Controller]")]
    public class CommentController : Controller
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddComment([FromBody] CreateComment comment)
        {
            if (comment == null || string.IsNullOrEmpty(comment.Content) || comment.POIId == 0)
            {
                return BadRequest();
            }

            var c = await _commentService.AddAsync(comment, User.GetId());

            return CreatedAtAction(nameof(GetComment), new { id = c.Id }, c);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComment(int id)
        {
            CommentDTO c = await _commentService.GetAsync(id);
            return Json(c);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllComments(int? userId, int? poiId)
        {
            IEnumerable<CommentDTO> c = await _commentService.GetAllAsync(userId, poiId);
            return Json(c);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment([FromBody] UpdateComment comment, int id)
        {
            if (comment == null || string.IsNullOrEmpty(comment.Content))
            {
                return BadRequest();
            }

            var c = await _commentService.UpdateAsync(id, comment);
            return Json(c);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            await _commentService.DelAsync(id);
            return Ok();
        }
    }
}
