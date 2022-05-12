using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.DTO
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public DateDTO PublicationDate { get; set; }
        public string Content { get; set; }
        public string AuthorName { get; set; }
        
        //public int POIId { get; set; }
        //public string AppUserId { get; set; }
        //public AppUserDTO AppUser { get; set; }
    }
}
