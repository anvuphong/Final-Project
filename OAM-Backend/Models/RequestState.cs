using System.ComponentModel.DataAnnotations;

namespace OAM_Backend.Models
{
    public class RequestState : BaseEntity
    {
        [Key]
        public int RequestStateId { get; set; }
        public string RequestStateName { get; set; }
    }
}
