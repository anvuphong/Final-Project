using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OAM_Backend.Models;

namespace OAM_Backend.Repositories
{
    public interface IAssetStateRepository
    {
        public AssetState GetAssetStateById(int id);
    }
}