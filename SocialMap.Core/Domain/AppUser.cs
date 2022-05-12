using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Domain
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserfrontId { get; set; }
        public string UserName { get; set; }

        public ICollection<POI> POIs { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<POIAccess> POIAccesses { get; set; }
    }
}
