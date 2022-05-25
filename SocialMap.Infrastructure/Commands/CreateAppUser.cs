using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.Commands
{
    public class CreateAppUser
    {
        [JsonProperty("record")]
        public UserRecord Record { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }
    }

    public class UserRecord
    {
        [JsonProperty("userUuid")]
        public string UserUuid { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }
    }
}
