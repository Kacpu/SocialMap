using SocialMap.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Commands
{
    public class CreateCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<POIDTO> POIs { get; set; }
    }
}
