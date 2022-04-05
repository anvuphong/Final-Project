namespace OAM_Backend.Models.Requests
{
    public class UserUpdateRequest
    {
        public string Staffcode { get; set; }
        public DateTime DOB { get; set; }
        public DateTime JoinedDate { get; set; }
        public bool Gender { get; set; }
        public bool IsAdmin { get; set; }
    }
}
