using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OAM_Backend.Models;

namespace OAM_Backend.Services
{
    public interface IAssignmentStateService
    {
        List<AssignmentState> GetAllAssignmentState();
        AssignmentState? GetAssignmentState(int stateId);
    }
}