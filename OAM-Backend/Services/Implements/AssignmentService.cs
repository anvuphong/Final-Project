using AutoMapper;
using OAM_Backend.Models;
using OAM_Backend.Models.Requests;
using OAM_Backend.Models.Responses;
using OAM_Backend.Repositories;

namespace OAM_Backend.Services.Implements
{
    public class AssignmentService : IAssignmentService
    {
        private readonly IAssignmentRepository _assignmentRepository;
        private readonly IMapper _mapper;
        private readonly IAssetRepository _assetRepository;
        private readonly IAssignmentStateRepository _assignmentStateRepository;
        private readonly IUserRepository _userRepository;

        public AssignmentService(IAssignmentRepository assignmentRepository, IMapper mapper, IAssetRepository assetRepository, IAssignmentStateRepository assignmentStateRepository, IUserRepository userRepository)
        {
            _assignmentRepository = assignmentRepository;
            _mapper = mapper;
            _assetRepository = assetRepository;
            _assignmentStateRepository = assignmentStateRepository;
            _userRepository = userRepository;
        }
        public PagedResponse<List<AssignmentAdminView>> GetAll(PageAction pageAction, string location, int status, string date)
        {
            return _assignmentRepository.GetAll(pageAction, location, status, date);
        }
        public List<Assignment> GetAssignmentByStaffcode(string staffcode)
        {
            return _assignmentRepository.GetAssignmentByStaffcode(staffcode);
        }
        public List<Assignment> GetAssignmentByAssetCode(string assetcode)
        {
            return _assignmentRepository.GetAssignmentByAssetCode(assetcode);
        }
        public PagedResponse<List<AssignmentAdminView>> GetAssigmentsByUsers(PageAction pageAction, string staffcode)
        {
            return _assignmentRepository.GetAssigmentsByUsers(pageAction, staffcode);
        }
        public Assignment DeclineAssignment(int assignmentId)
        {
            return _assignmentRepository.DeclineAssignment(assignmentId);
        }
       
        public Assignment AcceptAssignment(int assignmentId)
        {
            return _assignmentRepository.AcceptAssignment(assignmentId);
        }

        public Assignment? Create(AssignmentRequest assignmentRequest)
        {
            var assignedBy = _userRepository.GetUserByStaffcode(assignmentRequest.AssignedBy);
            var assignedTo = _userRepository.GetUserByStaffcode(assignmentRequest.AssignedTo);
            var asset = _assetRepository.IsAvailableAsset(assignmentRequest.AssetCode);
            var currentDate = DateTime.Today;
            if (assignedBy == null || assignedTo == null || asset == null || assignmentRequest.AssignmentDate < currentDate)
            {
                return null;
            }
            var assignment = _mapper.Map<Assignment>(assignmentRequest);
            assignment.StateId = 1;
            _assignmentRepository.Create(assignment);
            asset.StateId = 5;
            _assetRepository.Update(asset);
            return assignment;
        }

        public Assignment? Update(int assignmentId, AssignmentRequest assignmentRequest)
        {
            var assignment = _assignmentRepository.GetAssignmentById(assignmentId);
            var currentDate = DateTime.Today;

            //Check Assignment is valid or not
            if (assignment == null || assignmentRequest.AssignmentDate < currentDate)
            {
                return null;
            }

            //Check AssignmentBy
            if (!assignment.AssignedBy.Equals(assignmentRequest.AssignedBy))
            {
                var assignedBy = _userRepository.GetUserByStaffcode(assignmentRequest.AssignedBy);
                if (assignedBy == null) return null;
                assignment.AssignedBy = assignmentRequest.AssignedBy;
            }

            //Check AssignmentTo
            if (!assignment.AssignedTo.Equals(assignmentRequest.AssignedTo))
            {
                var assignedTo = _userRepository.GetUserByStaffcode(assignmentRequest.AssignedTo);
                if (assignedTo == null) return null;
                assignment.AssignedTo = assignmentRequest.AssignedTo;
            }

            //Check Asset
            if (!assignmentRequest.AssetCode.Equals(assignment.AssetCode))
            {
                var newAsset = _assetRepository.IsAvailableAsset(assignmentRequest.AssetCode);
                if (newAsset == null)
                {
                    return null;
                }
                newAsset.StateId = 5;
                _assetRepository.Update(newAsset);
                var oldAsset = _assetRepository.GetAsset(assignment.AssetCode);
                if (oldAsset == null)
                {
                    return null;
                }
                oldAsset.StateId = 1;
                _assetRepository.Update(oldAsset);
                assignment.AssetCode = assignmentRequest.AssetCode;
            }
            assignment.Note = assignmentRequest.Note;
            _assignmentRepository.Update(assignment);
            return assignment;
        }
         public void Delete(int code)
        {
            _assignmentRepository.Delete(code);
        }

        public Assignment? GetAssignmentById(int assignmentId)
        {
            return _assignmentRepository.GetAssignmentById(assignmentId);
        }
    }
}
