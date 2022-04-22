using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace SocialMap.WebAPI.Helpers
{
    public class HeaderChecker
    {
        public static bool IsUserfrontWebhookTokenValid(string authorization)
        {
            if (AuthenticationHeaderValue.TryParse(authorization, out var headerValue))
            {
                var scheme = headerValue.Scheme;
                var token = headerValue.Parameter;

                if(scheme == "Bearer" && token == "uf_test_webhook_xbr78p4n_fa098461c7d34ad4cb00db1faf6443e6")
                {
                    return true;
                }
            }

            return false;
        }
    }
}
