using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OAM_Backend.Models.Responses
{
    public class AssetResponse
    {
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public string CategoryName { get; set; }
    }
}