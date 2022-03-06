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
        Task<CommentDTO> AddAsync(CommentDTO comment);
        Task<CommentDTO> GetAsync(int id);
        Task<IEnumerable<CommentDTO>> BrowseAllAsync();
        Task UpdateAsync(CommentDTO comment);
        Task DelAsync(CommentDTO comment);
    }
}
