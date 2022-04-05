using OAM_Backend.Models;
using OAM_Backend.Models.Responses;

namespace OAM_Backend.Repositories
{
    public interface IAssignmentRepository
    {
        PagedResponse<List<AssignmentAdminView>> GetAll(PageAction pageAction, string location,int status,string date);
        List<Assignment> GetAssignmentByStaffcode(string staffcode);
        List<Assignment> GetAssignmentByAssetCode(string assetcode);
        public PagedResponse<List<AssignmentAdminView>> GetAssigmentsByUsers(PageAction pageAction, string staffcode);

        Assignment? GetAssignmentById(int assignmentId);
        public void Create(Assignment assignment);
        public void Update(Assignment assignment);
        public Assignment DeclineAssignment(int assignmentId);
        public Assignment AcceptAssignment(int assignmentId);       
        public void Delete(int code);

    }
}
