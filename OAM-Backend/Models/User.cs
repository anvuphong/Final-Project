using System.ComponentModel.DataAnnotations;

namespace OAM_Backend.Models
{
    public class User : BaseEntity
    {
        [Key]
        public int Id { get; set; }
        public string Staffcode { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public DateTime JoinedDate { get; set; }
        public bool Gender { get; set; }
        public string Location { get; set; }
        public int LogCount { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set; }
    }
}
