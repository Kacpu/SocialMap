using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Core.Domain
{
    public class POI : IEquatable<POI>
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public string Description { get; set; }
        public bool IsGlobal { get; set; } = false;
        public bool IsAccepted { get; set; } = false;

        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public ICollection<Category> Categories { get; set; }
        public ICollection<Like> Likes { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<POIAccess> POIAccesses { get; set; }

        public bool Equals(POI other)
        {
            if (other is null)
                return false;

            return Id == other.Id;
        }

        public override bool Equals(object obj) => Equals(obj as POI);
        public override int GetHashCode() => (Id).GetHashCode();
    }
}
