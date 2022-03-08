using SocialMap.Core.Domain;
using SocialMap.Core.Repositories;
using SocialMap.Infrastructure.DTO;
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

        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<CommentDTO> AddAsync(CommentDTO comment)
        {
            var c = await _commentRepository.AddAsync(ToDomain(comment));
            return c != null ? await Task.FromResult(ToDTO(c)) : null;
        }

        public async Task<CommentDTO> GetAsync(int id)
        {
            var comment = await _commentRepository.GetAsync(id);
            return comment != null ? await Task.FromResult(ToDTO(comment)) : null;
        }

        public async Task<IEnumerable<CommentDTO>> BrowseAllAsync()
        {
            var comments = await _commentRepository.BrowseAllAsync();
            return comments != null ? comments.Select(c => ToDTO(c)) : null;
        }

        public async Task UpdateAsync(CommentDTO comment)
        {
            if (comment != null)
            {
                await _commentRepository.UpdateAsync(ToDomain(comment));
            }
        }

        public async Task DelAsync(CommentDTO comment)
        {
            if (comment != null)
            {
                await _commentRepository.DelAsync(ToDomain(comment));
            }
        }

        private CommentDTO ToDTO(Comment c)
        {
            return new CommentDTO()
            {
                Id = c.Id,
                PublicationDate = c.PublicationDate,
                Content = c.Content,
                POIId = c.POIId,
                AppUserId = c.AppUserId,
                AppUser = c.AppUser != null ? new AppUserDTO()
                {
                    Id = c.AppUser.Id,
                    UserName = c.AppUser.UserName
                } : null
            };
        }

        private Comment ToDomain(CommentDTO cDTO)
        {
            return new Comment()
            {
                Id = cDTO.Id,
                PublicationDate = cDTO.PublicationDate,
                Content = cDTO.Content,
                POIId = cDTO.POIId,
                AppUserId = cDTO.AppUserId
            };
        }
    }
}
