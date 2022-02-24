using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Domain
{
    public class Comment
    {
        public int Id { get; set; }
        public DateTime PublicationDate { get; set; } = DateTime.Now;
        public string Content { get; set; }

        public int POIId { get; set; }
        public POI POI { get; set; }

        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
