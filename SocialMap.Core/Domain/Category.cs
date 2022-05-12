using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Domain
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public ICollection<POI> POIs { get; set; }
    }
}
