using OAM_Backend.Data;
using OAM_Backend.Helpers;
using OAM_Backend.Models;
using OAM_Backend.Models.Responses;
using Microsoft.EntityFrameworkCore;

namespace OAM_Backend.Repository.Implements
{
    public class StateRepository : IStateRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public StateRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<AssetState> GetAllState()
        {
            return _dbContext.AssetStates != null ? _dbContext.AssetStates.ToList() : Enumerable.Empty<AssetState>().ToList();
        }
        public AssetState? GetState(int stateId)
        {
            if (_dbContext.AssetStates == null) return null;
            return _dbContext.AssetStates.SingleOrDefault(x => x.StateId == stateId);
        }
    }
}
