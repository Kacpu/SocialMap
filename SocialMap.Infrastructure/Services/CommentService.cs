using SocialMap.Core.Domain;
using SocialMap.Core.Repositories;
using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using SocialMap.Infrastructure.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPOIRepository _poiRepository;

        public CommentService(ICommentRepository commentRepository, IPOIRepository poiRepository)
        {
            _commentRepository = commentRepository;
            _poiRepository = poiRepository;
        }

        public async Task<CommentDTO> AddAsync(CreateComment createComment, int authorId)
        {
            var poi = await _poiRepository.GetAsync(createComment.POIId);

            if (poi is null)
            {
                throw new BadRequestException("commented poi not found");
            }

            var c = createComment.ToDomain();
            c.AppUserId = authorId;
            c = await _commentRepository.AddAsync(c);
            return await Task.FromResult(c.ToDTO());
        }

        public async Task<CommentDTO> GetAsync(int id)
        {
            var c = await _commentRepository.GetAsync(id);

            if (c is null)
                throw new NotFoundException("comment not found");

            return await Task.FromResult(c.ToDTO());
        }

        public async Task<IEnumerable<CommentDTO>> GetAllAsync(int? userId, int? poiId)
        {
            var comments = await _commentRepository.GetAllAsync(userId, poiId);

            return await Task.FromResult(comments.Select(c => c.ToDTO()));
        }

        public async Task<CommentDTO> UpdateAsync(int id, UpdateComment updateComment, int? authorId)
        {
            var c = await _commentRepository.GetAsync(id);

            if (c is null)
                throw new NotFoundException("comment not found");

            if (authorId != null && c.AppUserId != authorId)
                throw new ForbidException("you do not have permission to change this comment");

            c.Content = updateComment.Content;

            await _commentRepository.UpdateAsync();
            return await Task.FromResult(c.ToDTO());
        }

        public async Task DelAsync(int id, int? authorId)
        {
            var c = await _commentRepository.GetAsync(id);

            if (c is null)
                throw new NotFoundException("comment does not exist");

            if (authorId != null && c.AppUserId != authorId)
                throw new ForbidException("you do not have permission to delete this comment");

            await _commentRepository.DelAsync(c.Id);
        }
    }
}
