using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connector.Areas.Auth.Services
{
    public interface IGoogleCredentialInitializer
    {
        public Google.Apis.Services.BaseClientService.Initializer Initializer { get; set; }
    }
}
