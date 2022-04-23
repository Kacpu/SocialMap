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
            string roleValue;

            try
            {
                roleValue = principal.Claims.First(c => c.Type == "authorization").Value;
                JObject roleJson = JObject.Parse(roleValue);
                roleValue = (string) roleJson["pn4xgmpn"]["roles"][0];
            }
            catch
            {
                roleValue = "anonimus";
            }
            
            ClaimsIdentity claimsIdentity = new();
            var claimType = "role";
            if (!principal.HasClaim(claim => claim.Type == claimType))
            {
                claimsIdentity.AddClaim(new Claim(claimType, roleValue));
            }

            principal.AddIdentity(claimsIdentity);
            return Task.FromResult(principal);
        }
    }
}
