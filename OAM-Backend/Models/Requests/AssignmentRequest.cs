using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OAM_Backend.Models.Requests
{
    public class AssignmentRequest
    {
        public string AssetCode { get; set; }
        public string AssignedBy { get; set; }
        public string AssignedTo { get; set; }
        public DateTime AssignmentDate { get; set; }
        public string Note { get; set; }
    }
}