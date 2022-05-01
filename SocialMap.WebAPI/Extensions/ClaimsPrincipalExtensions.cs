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

        public static string GetRole(this ClaimsPrincipal principal)
        {
            return principal?.Claims.FirstOrDefault(x => x.Type == "role")?.Value;
        }

        public static bool IsAdmin(this ClaimsPrincipal principal)
        {
            return principal?.GetRole() == "admin";
        }

        public static bool IsMod(this ClaimsPrincipal principal)
        {
            return principal?.GetRole() == "editor";
        }
    }
}
