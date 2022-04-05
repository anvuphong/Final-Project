using System.ComponentModel.DataAnnotations;

namespace OAM_Backend.Models
{
    public class AssignmentState : BaseEntity
    {
        [Key]
        public int AssignmentStateId { get; set; }
        public string AssignmentStateName { get; set; }
    }
}