using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Commands
{
    public class CreateComment
    {
        public int CreatorId { get; set; }
        public int PoiId { get; set; }
        public string Content { get; set; }
    }
}
