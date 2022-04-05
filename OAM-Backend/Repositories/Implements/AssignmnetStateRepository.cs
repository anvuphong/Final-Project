using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OAM_Backend.Data;
using OAM_Backend.Models;

namespace OAM_Backend.Repositories.Implements
{
    public class AssignmnetStateRepository : IAssignmentStateRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public AssignmnetStateRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public List<AssignmentState> GetAllAssignmentState()
        {
            return _dbContext.AssignmentStates != null ? _dbContext.AssignmentStates.ToList() : Enumerable.Empty<AssignmentState>().ToList();
        }

        public AssignmentState? GetAssignmentState(int stateId)
        {
            return _dbContext.AssignmentStates.Find(stateId);
        }
   
    }
}