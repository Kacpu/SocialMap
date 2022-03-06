using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.DTO
{
    public class POIAccessDTO
    {
        public int Id { get; set; }
        public int POIId { get; set; }
        public string AppUserId { get; set; }
        public bool IsAccpeted { get; set; }
    }
}
