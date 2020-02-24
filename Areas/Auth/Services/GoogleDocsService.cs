using Google.Apis.Docs.v1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connector.Areas.Auth.Services
{
    public class GoogleDocsService : IGoogleDocsService
    {
        public DocsService DocsService { get; set; }

        public GoogleDocsService(IGoogleCredentialInitializer initializer)
        {
            DocsService = new DocsService(initializer.Initializer);
        }
    }
}
