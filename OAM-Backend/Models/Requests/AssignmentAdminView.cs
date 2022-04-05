using System.ComponentModel.DataAnnotations;

namespace OAM_Backend.Models
{
    public class AssignmentAdminView : BaseEntity
    {
        public int AssignmentId { get; set; }
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public string AssignedToId { get; set; }
        public string AssignedToName { get; set; }
        public string AssignedById { get; set; }
        public string AssignedByName { get; set; }
        public DateTime AssignmentDate { get; set; }
        public int StateId { get; set; }
        public string Note { get; set; }

    }
}
