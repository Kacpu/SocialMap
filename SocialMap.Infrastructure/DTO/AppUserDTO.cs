using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.DTO
{
    public class AppUserDTO
    {
        public int Id { get; set; }
        public string UserfrontId { get; set; }
        public string UserName { get; set; }

        //public ICollection<POIDTO> POIs { get; set; }
        //public ICollection<CommentDTO> Comments { get; set; }
        //public ICollection<LikeDTO> Likes { get; set; }
        //public ICollection<POIAccessDTO> POIAccesses { get; set; }
    }
}
