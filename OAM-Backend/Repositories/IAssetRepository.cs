using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OAM_Backend.Models;
using OAM_Backend.Models.Responses;

namespace OAM_Backend.Repositories
{
    public interface IAssetRepository
    {
        public void Create(Asset asset);
        public string GetMaxIdByCategoryId(int id);
        public void Update(Asset asset);
        public bool IsAssetExists(string assetCode);
        PagedResponse<List<AssetAdminView>> GetAll(PageAction pageAction,string location,int status,int category);
        Asset? GetAsset(string code);
        List<Asset> GetAssets();
        Asset? IsAvailableAsset(string assetCode);
        void Delete(string code);
        List<AssetResponse> GetAvailableAssets(string location);
    }
}
