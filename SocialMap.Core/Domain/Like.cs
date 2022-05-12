using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Domain
{
    public class Like
    {
        public int Id { get; set; }
        public int AppUserId { get; set; }
        public int POIId { get; set; }
    }
}
