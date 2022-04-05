using OAM_Backend.Models;
using OAM_Backend.Models.Requests;
using OAM_Backend.Models.Responses;

namespace OAM_Backend.Services
{
    public interface IAssignmentService
    {
        PagedResponse<List<AssignmentAdminView>> GetAll(PageAction pageAction, string location, int status, string date);
        List<Assignment> GetAssignmentByStaffcode(string staffcode);
        List<Assignment> GetAssignmentByAssetCode(string assetcode);
        public PagedResponse<List<AssignmentAdminView>> GetAssigmentsByUsers(PageAction pageAction, string staffcode);
        public Assignment? Create(AssignmentRequest assignmentRequest);
        public Assignment? Update(int assignmentId, AssignmentRequest assignmentRequest);
        public Assignment DeclineAssignment(int assignmentId);
        public Assignment AcceptAssignment(int assignmentId);
        public void Delete(int code);
        Assignment? GetAssignmentById(int assignmentId);

    }
}
