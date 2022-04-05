using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OAM_Backend.Models;
using OAM_Backend.Services;

namespace OAM_Backend.Controllers
{
    [ApiController]
    [Route("api/assignment-states")]
    public class AssignmentStateController : ControllerBase
    {
        private readonly IAssignmentStateService _stateService;

        public AssignmentStateController(IAssignmentStateService stateService)
        {
            _stateService = stateService;
        }

        [HttpGet("list")]
        public ActionResult<List<AssignmentState>> GetState()
        {
            return Ok(_stateService.GetAllAssignmentState());
        }

        [HttpGet("list/{id}")]
        public ActionResult GetState(int id)
        {
            return Ok(_stateService.GetAssignmentState(id));
        }
    }
}