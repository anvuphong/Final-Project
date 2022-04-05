using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OAM_Backend.Data;
using OAM_Backend.Models;
using OAM_Backend.Services;
using OAM_Backend.Authorization;
using OAM_Backend.Models.Requests;

namespace OAM_Backend.Controllers
{
    [Authorize]
    [Route("api/assignments")]
    [ApiController]
    public class AssignmentsController : ControllerBase
    {
        private readonly IAssignmentService _assignmentService;
        public AssignmentsController(IAssetService assetService, IAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpGet("list")]
        public IActionResult GetListAssignments([FromQuery] PageAction pageAction, string location, int status, string? date)
        {
            return Ok(_assignmentService.GetAll(pageAction, location, status, date));
        }
        [HttpGet("list/user")]
        public IActionResult GetAssignmentsByUsers([FromQuery] PageAction pageAction, string staffcode)
        {

            return Ok(_assignmentService.GetAssigmentsByUsers(pageAction, staffcode));
        }
        [HttpGet("list/{staffCode}")]
        public IActionResult GetAssignmentByStaffCode(string staffCode)
        {
            return Ok(_assignmentService.GetAssignmentByStaffcode(staffCode));
        }

        [HttpPost("create")]
        public ActionResult PostAssignment(AssignmentRequest assignmentRequest)
        {
            var assignment = _assignmentService.Create(assignmentRequest);
            if (assignment != null)
            {
                return Ok(assignment);
            }
            return BadRequest();
        }

        [HttpPut("edit/{assignmentId}")]
        public ActionResult PutAssignment(int assignmentId, AssignmentRequest assignmentRequest)
        {
            var assignment = _assignmentService.Update(assignmentId, assignmentRequest);
            if (assignment == null)
            {
                return BadRequest();
            }
            return Ok(assignment);
        }
        [HttpPut("decline-assignment")]
        public IActionResult DisableAssignment(int id)
        {
            var assignment = _assignmentService.DeclineAssignment(id);
            if (assignment == null)
            {
                return BadRequest();
            }
            return Ok(assignment);
        }

        [HttpPut("accept-assignment")]
        public IActionResult AcceptAssignment(int id)
        {
            var assignment = _assignmentService.AcceptAssignment(id);
            if (assignment == null)
            {
                return BadRequest();
            }
            return Ok(assignment);
        }
        [HttpDelete("delete")]
        public void Delete(int code)
        {
            _assignmentService.Delete(code);
        }

        [HttpGet("detail/{assignmentId}")]
        public IActionResult GetDetail(int assignmentId){
            return Ok(_assignmentService.GetAssignmentById(assignmentId));
        }
    }
}
