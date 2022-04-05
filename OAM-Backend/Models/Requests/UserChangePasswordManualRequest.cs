using System.ComponentModel.DataAnnotations;

namespace OAM_Backend.Models.Requests
{
    public class UserChangePasswordManualRequest
    {
        [Required]
        public string Staffcode { get; set; }
        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
