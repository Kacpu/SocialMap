using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Commands
{
    public class CreateLike
    {
        public string AppUserId { get; set; }
        public int POIId { get; set; }
    }
}
