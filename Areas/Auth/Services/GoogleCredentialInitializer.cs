using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Connector.Areas.Auth.Services
{

    public class GoogleCredentialInitializer : IGoogleCredentialInitializer
    {
        public string[] Scopes = { DriveService.Scope.DriveReadonly };

        public BaseClientService.Initializer Initializer { get; set; }

        public GoogleCredentialInitializer()
        {
            UserCredential credential;
            using (var stream = new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
            {
                string credPath = "token.json";
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
            }

            this.Initializer =
                new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential,
                    ApplicationName = string.Empty,
                };
        }
    }
}
