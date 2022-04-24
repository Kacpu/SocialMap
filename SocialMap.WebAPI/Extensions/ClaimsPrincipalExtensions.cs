using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SocialMap.WebAPI.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetId(this ClaimsPrincipal principal)
        {
            return Convert.ToInt32(principal.Claims.FirstOrDefault(x => x.Type == "id").Value);
        }
    }
}
