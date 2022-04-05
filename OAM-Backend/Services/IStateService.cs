using OAM_Backend.Models;
using OAM_Backend.Models.Requests;
using OAM_Backend.Models.Responses;

namespace OAM_Backend.Services
{
    public interface IStateService
    {
        List<AssetState> GetAllState();
        AssetState GetState(int stateId);
    }
}
