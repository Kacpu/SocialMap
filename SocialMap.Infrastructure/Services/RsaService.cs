using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Services
{
    public class RsaService : IRsaService
    {
        public RsaSecurityKey GetRsaKey(string base64Key)
        {
            RSA rsa = RSA.Create();
            rsa.ImportSubjectPublicKeyInfo(
                source: Convert.FromBase64String(base64Key),
                bytesRead: out int _
            );

            return new RsaSecurityKey(rsa);
        }
    }
}
