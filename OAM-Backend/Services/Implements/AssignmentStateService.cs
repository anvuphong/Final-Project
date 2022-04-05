using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OAM_Backend.Models;
using OAM_Backend.Repositories;

namespace OAM_Backend.Services.Implements
{
    public class AssignmentStateService : IAssignmentStateService
    {
        private readonly IAssignmentStateRepository _stateRepository;
        public AssignmentStateService(IAssignmentStateRepository stateRepository)
        {
            _stateRepository = stateRepository;
        }
        public List<AssignmentState> GetAllAssignmentState()
        {
            return _stateRepository.GetAllAssignmentState();
        }

        public AssignmentState? GetAssignmentState(int stateId)
        {
            return _stateRepository.GetAssignmentState(stateId);
        }
    }
}