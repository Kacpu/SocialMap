using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Commands
{
    public class CreateLike
    {
        public int AppUserId { get; set; }
        public int PoiId { get; set; }
    }
}
