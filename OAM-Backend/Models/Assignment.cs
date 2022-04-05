using System.ComponentModel.DataAnnotations;

namespace OAM_Backend.Models
{
    public class Assignment : BaseEntity
    {
        [Key]
        public int AssignmentId { get; set; }
        public string AssetCode { get; set; }
        public string AssignedTo { get; set; }
        public string AssignedBy { get; set; }
        public DateTime AssignmentDate { get; set; }
        public int StateId { get; set; }
        public string Note { get; set; }
    }
}
