using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OAM_Backend.Models;

namespace OAM_Backend.Repositories
{
    public interface IAssignmentStateRepository
    {
        List<AssignmentState> GetAllAssignmentState();
        AssignmentState? GetAssignmentState(int stateId);
    }
}