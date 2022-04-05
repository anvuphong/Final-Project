using System.ComponentModel.DataAnnotations;

namespace OAM_Backend.Models
{
    public class AssetState : BaseEntity
    {
        [Key]
        public int StateId { get; set; }
        public string StateName { get; set; }
    }
}
