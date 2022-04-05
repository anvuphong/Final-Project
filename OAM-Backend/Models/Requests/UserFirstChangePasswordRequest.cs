using System.ComponentModel.DataAnnotations;

namespace OAM_Backend.Models.Requests
{
    public class UserFirstChangePasswordRequest
    {
        [Required]
        public string Staffcode { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
