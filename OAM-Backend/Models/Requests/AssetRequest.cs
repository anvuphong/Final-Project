using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OAM_Backend.Models.Requests
{
    public class AssetRequestToEdit
    {
        public string AssetName { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public int StateId { get; set; }
    }
    public class AssetRequestToCreate : AssetRequestToEdit
    {
        public int CategoryId { get; set; }
        public string Location { get; set; }
        public string Quantity { get; set; }
    }
}