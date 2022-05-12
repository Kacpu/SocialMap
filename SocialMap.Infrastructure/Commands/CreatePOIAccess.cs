using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Commands
{
    public class CreatePOIAccess
    {
        public int POIId { get; set; }
        public int InvitedUserId { get; set; }
    }
}
