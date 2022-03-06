using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Domain
{
    public class Like
    {
        public int Id { get; set; }
        public string AppUserId { get; set; }
        public int POIId { get; set; }
    }
}
