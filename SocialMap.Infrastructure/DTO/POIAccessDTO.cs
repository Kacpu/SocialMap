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
        public int AppUserId { get; set; }
        public bool IsAccpeted { get; set; }
        public DateDTO IssueDate {get; set;}

        public string IssuerName { get; set; }
        public string InvitedUserName { get; set; }
        public POIDTO Poi {get; set;}
    }
}
