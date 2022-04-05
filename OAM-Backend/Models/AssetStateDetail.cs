using System.ComponentModel.DataAnnotations;

namespace OAM_Backend.Models
{
    public class AssetStateDetail : BaseEntity
    {
        [Key]
        public int AssetStateId { get; set; }
        public int StateId { get; set; }
        public string AssetCode { get; set; }
    }
}
