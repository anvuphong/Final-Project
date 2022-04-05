using System.ComponentModel.DataAnnotations;

namespace OAM_Backend.Models
{
    public class ReturnRequest : BaseEntity
    {
        [Key]
        public int RequestID {get; set;}
        public string AssetCode {get; set;}
        public string AssetName {get; set;}
        public string RequestBy {get; set;}
        public string AssignedBy {get; set;}
        public DateTime AssignedDate {get; set;}
        public DateTime ReturnDate {get; set;}
        public int RequestStateId { get; set; }
    }
}
