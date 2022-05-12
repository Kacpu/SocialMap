using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialMap.WebAPI.Helpers
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:3000")
                                      .AllowAnyMethod()
                                      .AllowAnyHeader();
                                  });
            });
        }

        public static void ConfigureAuthentication(this IServiceCollection services, string rsabase)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    // If the access token does not have a `sub` claim, `User.Identity.Name` will be `null`. Map it to a different claim by setting the NameClaimType below.
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        NameClaimType = "uuid",
                        IssuerSigningKey = RsaTransformation.GetRsaKey(rsabase),
                        ValidateIssuer = true,
                        ValidIssuer = "userfront",
                        ValidateAudience = false
                    };
                });
        }

        public static void ConfigurePolicies(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireClaim("role", "admin"));
                options.AddPolicy("Editor", policy => policy.RequireClaim("role", "editor"));
                options.AddPolicy("SuperUser", policy => policy.RequireClaim("role", "admin", "editor"));
            });
        }
    }
}
