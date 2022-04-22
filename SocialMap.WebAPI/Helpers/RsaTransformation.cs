using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace SocialMap.WebAPI.Helpers
{
    public class RsaTransformation
    {
        public static RsaSecurityKey GetRsaKey(string base64Key)
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
