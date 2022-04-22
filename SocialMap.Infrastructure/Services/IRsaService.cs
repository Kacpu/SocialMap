using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public interface IRsaService
    {
        RsaSecurityKey GetRsaKey(string base64Key);
    }
}
