using AutoMapper;
using OAM_Backend.Data;
using OAM_Backend.Models;
using OAM_Backend.Models.Requests;
using OAM_Backend.Models.Responses;
using OAM_Backend.Repository;

namespace OAM_Backend.Services.Implements
{
    public class StateService : IStateService
    {
        private readonly IStateRepository _stateRepository;
        public StateService(IStateRepository stateRepository)
        {
            _stateRepository = stateRepository;
        }

        public List<AssetState> GetAllState()
        {
            return _stateRepository.GetAllState();
        }
        
        public AssetState GetState(int stateId)
        {
            return _stateRepository.GetState(stateId);
        }

    }
}
