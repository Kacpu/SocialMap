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
            return Convert.ToInt32(principal?.Claims.FirstOrDefault(x => x.Type == "id")?.Value);
        }

        public static bool HasRole(this ClaimsPrincipal principal, string role)
        {
            foreach(var r in principal?.Claims.Where(x => x.Type == "role").Select(x => x.Value))
            {
                if(r == role)
                {
                    return true;
                }
            }
            return false;
        }

        public static bool IsAdmin(this ClaimsPrincipal principal)
        {
            return principal.HasRole("admin");
        }

        public static bool IsMod(this ClaimsPrincipal principal)
        {
            return principal.HasRole("editor");
        }
    }
}
