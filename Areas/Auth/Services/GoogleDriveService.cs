using Google.Apis.Drive.v3;
using Google.Apis.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connector.Areas.Auth.Services
{
    public class GoogleDriveService : IGoogleDriveService
    {
        public DriveService DriveService { get; set; }

        public GoogleDriveService(IGoogleCredentialInitializer initializer)
        {
            DriveService = new DriveService(initializer.Initializer);
        }
    }
}
