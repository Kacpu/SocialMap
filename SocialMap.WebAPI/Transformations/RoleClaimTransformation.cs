using Microsoft.AspNetCore.Authentication;
using Newtonsoft.Json.Linq;
using SocialMap.Infrastructure.Repositories;
using SocialMap.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SocialMap.WebAPI.Transformations
{
    public class RoleClaimTransformation : IClaimsTransformation
    {
        public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
        {
            var claimType = "role";

            if (!principal.HasClaim(claim => claim.Type == claimType))
            {
                string roleValue;

                try
                {
                    roleValue = principal.Claims.First(c => c.Type == "authorization").Value;
                    JObject roleJson = JObject.Parse(roleValue);
                    roleValue = (string)roleJson["xbr78p4n"]["roles"][0];
                }
                catch
                {
                    roleValue = "anonim";
                }

                ClaimsIdentity claimsIdentity = new();
                claimsIdentity.AddClaim(new Claim(claimType, roleValue));
                principal.AddIdentity(claimsIdentity);
            }

            return Task.FromResult(principal);
        }
    }
}
