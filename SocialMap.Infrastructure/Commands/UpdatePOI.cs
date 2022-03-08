using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Commands
{
    public class UpdatePOI
    {
        public string Name { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public string Description { get; set; }
        public bool IsGlobal { get; set; } = false;

        public int CategoryId { get; set; }
    }
}
