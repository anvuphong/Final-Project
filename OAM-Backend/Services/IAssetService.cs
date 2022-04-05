using OAM_Backend.Models;
using OAM_Backend.Models.Requests;
using OAM_Backend.Models.Responses;

namespace OAM_Backend.Services
{
    public interface IAssetService
    {
        PagedResponse<List<AssetAdminView>> GetAll(PageAction pageAction, string location, int status, int category);
        Asset GetAsset(string code);
        void Delete(string code);
        public Asset Create(AssetRequestToCreate assetRequest);
        public Asset Update(string assetCode, AssetRequestToEdit assetRequest);
        public List<Asset> GetAssets();
        List<AssetResponse> GetAvailableAssets(string location);
    }
}
