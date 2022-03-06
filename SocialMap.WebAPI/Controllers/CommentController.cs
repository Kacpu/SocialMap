﻿using Microsoft.AspNetCore.Mvc;
using SocialMap.Infrastructure.DTO;
using SocialMap.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SocialMap.Infrastructure.Commands;

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
        public async Task<IActionResult> AddComment([FromBody] CreateComment comment)
        {
            if (comment == null)
            {
                return BadRequest();
            }

            CommentDTO commentDTO = new CommentDTO()
            {
                Content = comment.Content,
                POIId = comment.POIId,
                AppUserId = comment.AppUserId
            };

            var c = await _commentService.AddAsync(commentDTO);

            if (c == null)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GetComment), new { id = c.Id }, c);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComment(int id)
        {
            CommentDTO commentDTO = await _commentService.GetAsync(id);

            if (commentDTO == null)
            {
                return NotFound();
            }

            return Json(commentDTO);
        }

        [HttpGet]
        public async Task<IActionResult> BrowseAllComments()
        {
            IEnumerable<CommentDTO> commentsDTO = await _commentService.BrowseAllAsync();

            if (commentsDTO == null)
            {
                return NotFound();
            }

            return Json(commentsDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment([FromBody] UpdateComment comment, int id)
        {
            CommentDTO commentDTO = await _commentService.GetAsync(id);

            if (commentDTO == null)
            {
                return NotFound();
            }

            if (comment == null)
            {
                return BadRequest();
            }

            commentDTO.Content = comment.Content ?? commentDTO.Content;

            await _commentService.UpdateAsync(commentDTO);

            return Json(commentDTO);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            CommentDTO commentDTO = await _commentService.GetAsync(id);

            if (commentDTO == null)
            {
                return NotFound();
            }

            await _commentService.DelAsync(commentDTO);

            return Ok();
        }
    }
}