namespace OAM_Backend.Models.Requests
{
    public class UserCreationRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public DateTime JoinedDate { get; set; }
        public bool Gender { get; set; }
        public bool IsAdmin { get; set; }
        public string StaffCodeAdminAction { get; set; }
    }
}
