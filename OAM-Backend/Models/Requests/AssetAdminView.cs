using System.ComponentModel.DataAnnotations;

namespace OAM_Backend.Models
{
    public class AssetAdminView : BaseEntity
    {
        [Key]
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public string Specification { get; set; }
        public DateTime InstalledDate { get; set; }
        public string Location { get; set; }
        public string Quantity { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }

    }
}
