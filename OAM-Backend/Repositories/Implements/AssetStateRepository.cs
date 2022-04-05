using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OAM_Backend.Data;
using OAM_Backend.Models;

namespace OAM_Backend.Repositories.Implements
{
    public class AssetStateRepository : IAssetStateRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public AssetStateRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public AssetState GetAssetStateById(int id)
        {
            return _dbContext.AssetStates.Find(id);
        }
    }
}