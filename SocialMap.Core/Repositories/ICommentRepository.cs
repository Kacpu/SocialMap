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
        Task<IEnumerable<Comment>> BrowseAllAsync();
        Task UpdateAsync(Comment comment);
        Task DelAsync(Comment comment);
    }
}
