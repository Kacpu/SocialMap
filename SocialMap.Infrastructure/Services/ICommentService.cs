using SocialMap.Infrastructure.Commands;
using SocialMap.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public interface ICommentService
    {
        Task<CommentDTO> AddAsync(CreateComment comment, int authorId);
        Task<CommentDTO> GetAsync(int id);
        Task<IEnumerable<CommentDTO>> GetAllAsync(int? userId = null, int? poiId = null);
        Task<CommentDTO> UpdateAsync(int id, UpdateComment comment, int? authorId = null);
        Task DelAsync(int id, int? authorId = null);
    }
}
