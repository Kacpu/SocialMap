using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Domain
{
    public class AppUser
    {
        public int Id { get; set; }

        [Required]
        public string UserfrontId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string EmailAddress { get; set; }

        public ICollection<POI> POIs { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<POIAccess> POIAccesses { get; set; }
    }
}
