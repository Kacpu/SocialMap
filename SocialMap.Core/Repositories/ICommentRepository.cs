using SocialMap.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Repositories
{
    public interface ICommentRepository
    {
        Task<Comment> AddAsync(Comment comment);
        Task<Comment> GetAsync(int id);
        Task<IEnumerable<Comment>> GetAllAsync(int? userId = null, int? poiId = null);
        Task UpdateAsync();
        Task DelAsync(int id);
    }
}
