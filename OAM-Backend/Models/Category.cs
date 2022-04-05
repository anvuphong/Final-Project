using System.ComponentModel.DataAnnotations;

namespace OAM_Backend.Models
{
    public class Category : BaseEntity
    {
        [Key]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Prefix { get; set; }
    }
}
