using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.DTO
{
    public class POIDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public string Description { get; set; }

        public bool IsGlobal { get; set; }
        public bool IsAccepted { get; set; }

        public int CreatorId { get; set; }
        public string CreatorName { get; set; }

        public IEnumerable<CategoryDTO> Categories { get; set; }

        public int LikesNumber { get; set; }
    }
}
