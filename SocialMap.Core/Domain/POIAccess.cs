using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Domain
{
    public class POIAccess
    {
        public int Id { get; set; }
        public bool IsAccepted { get; set; } = false;
        public DateTime IssueDate { get; set; } = DateTime.Now;

        public int POIId { get; set; }
        public POI POI { get; set; }

        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
