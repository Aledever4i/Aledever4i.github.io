using Google.Apis.Docs.v1;

namespace Connector.Areas.Auth.Services
{
    public interface IGoogleDocsService
    {
        public DocsService DocsService { get; set; }
    }
}