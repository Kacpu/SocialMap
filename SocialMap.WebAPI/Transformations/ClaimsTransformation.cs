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
    public class ClaimsTransformation : IClaimsTransformation
    {
        private readonly IAppUserService _appUserService;

        public ClaimsTransformation(IAppUserService appUserService)
        {
            _appUserService = appUserService;
        }

        public async Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
        {
            await AddIdClaim(principal);
            AddRolesClaim(principal);

            return await Task.FromResult(principal);
        }

        private async Task AddIdClaim(ClaimsPrincipal principal)
        {
            var claimType = "id";

            if (!principal.HasClaim(claim => claim.Type == claimType))
            {
                int claimValue;

                try
                {
                    string uuid = principal.Claims.First(c => c.Type == "userUuid").Value;
                    var user = await _appUserService.GetAsync(uuid: uuid);
                    claimValue = user.Id;
                }
                catch
                {
                    throw new Exception("Can not get app user from UserId claim transform");
                }

                ClaimsIdentity claimsIdentity = new();
                claimsIdentity.AddClaim(new Claim(claimType, claimValue.ToString()));
                principal.AddIdentity(claimsIdentity);
            }
        }

        private void AddRolesClaim(ClaimsPrincipal principal)
        {
            var claimType = "role";

            if (!principal.HasClaim(claim => claim.Type == claimType))
            {
                ClaimsIdentity claimsIdentity = new();

                try
                {
                    var auth = principal.Claims.First(c => c.Type == "authorization").Value;
                    JObject roleJson = JObject.Parse(auth);
                    foreach(var role in roleJson["xbr78p4n"]["roles"])
                    {
                        claimsIdentity.AddClaim(new Claim(claimType, role.ToString()));
                    }
                }
                catch
                {
                    claimsIdentity.AddClaim(new Claim(claimType, "noone"));
                }

                principal.AddIdentity(claimsIdentity);
            }
        }
    }
}
