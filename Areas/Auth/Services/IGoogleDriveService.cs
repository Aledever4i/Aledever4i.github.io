using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Drive.v3;

namespace Connector.Areas.Auth.Services
{
    interface IGoogleDriveService
    {
        public DriveService DriveService { get; set; }
    }
}
