using AutoMapper;
using OAM_Backend.Models;
using OAM_Backend.Models.Requests;
using OAM_Backend.Models.Responses;
using OAM_Backend.Repositories;
using OAM_Backend.Repository;

namespace OAM_Backend.Services.Implements
{
    public class AssetService : IAssetService
    {
        private readonly IAssetRepository _assetRepository;
        private readonly IMapper _mapper;
        private readonly IAssetStateRepository _assetStateRepository;
        private readonly ICategoryRepository _categoryRepository;

        public AssetService(IAssetRepository assetRepository)
        {
            _assetRepository = assetRepository;
        }

        public AssetService(IAssetRepository assetRepository, IMapper mapper)
        {
            _assetRepository = assetRepository;
            _mapper = mapper;
        }
        public AssetService(IAssetRepository assetRepository, IMapper mapper, IAssetStateRepository assetStateRepository, ICategoryRepository categoryRepository)
        {
            _assetRepository = assetRepository;
            _assetStateRepository = assetStateRepository;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public PagedResponse<List<AssetAdminView>> GetAll(PageAction pageAction, string location, int status, int categoryid)
        {
            return _assetRepository.GetAll(pageAction, location, status, categoryid);
        }
        public Asset GetAsset(string code)
        {
            return _assetRepository.GetAsset(code);
        }

        public void Delete(string code)
        {
            _assetRepository.Delete(code);
        }

        public Asset? Create(AssetRequestToCreate assetRequest)
        {
            var category = _categoryRepository.GetCategoryById(assetRequest.CategoryId);
            var state = _assetStateRepository.GetAssetStateById(assetRequest.StateId);
            if (category != null)
            {
                if (state != null)
                {
                    var asset = _mapper.Map<Asset>(assetRequest);
                    var assetCodeWithMaxId = _assetRepository.GetMaxIdByCategoryId(assetRequest.CategoryId);
                    if (assetCodeWithMaxId == null)
                    {
                        asset.AssetCode = String.Format("{0}000001", category.Prefix, 1);
                    }
                    else
                    {
                        var length = category.Prefix.Length;
                        var maxId = int.Parse(assetCodeWithMaxId.Substring(length));
                        var newId = String.Format("{0,6:D6}", maxId + 1); //maxId=5 ==> id=000005
                        asset.AssetCode = String.Format("{0}{1}", category.Prefix, newId);
                    }
                    _assetRepository.Create(asset);
                    return asset;
                }
            }
            return null;
        }

        public Asset Update(string assetCode, AssetRequestToEdit assetRequest)
        {
            var state = _assetStateRepository.GetAssetStateById(assetRequest.StateId);
            var asset = _assetRepository.GetAsset(assetCode);
            if (asset != null)
            {
                if (state != null)
                {
                    asset.AssetName = assetRequest.AssetName;
                    asset.InstalledDate = assetRequest.InstalledDate;
                    asset.Specification = assetRequest.Specification;
                    asset.StateId = assetRequest.StateId;
                    _assetRepository.Update(asset);
                    return asset;
                }
            }
            return null;
        }
        public List<Asset> GetAssets()
        {
            return _assetRepository.GetAssets();
        }

        public List<AssetResponse> GetAvailableAssets(string location)
        {
            return _assetRepository.GetAvailableAssets(location);
        }

    }
}
