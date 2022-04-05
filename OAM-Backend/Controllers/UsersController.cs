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
using OAM_Backend.Constants;

namespace OAM_Backend.Controllers
{
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userServices;
        private readonly IAssignmentService _assignmentService;

        public UsersController(IUserService userService, IAssignmentService assignmentService)
        {
            _userServices = userService;
            _assignmentService = assignmentService;
        }

        [HttpGet("list")]
        public IActionResult GetUsers([FromQuery] PageAction pageAction, string location, int isAdmin)
        {
 
            return Ok(_userServices.GetAll(pageAction, location, isAdmin ));
        }

        [HttpGet("getusers")]
        public IActionResult GetUsers(string location)
        {
            return Ok(_userServices.GetUsers(location));
        }

        [HttpGet("detail/{staffcode}")]
        public IActionResult GetUserByStaffcode(string staffcode)
        {
            return Ok(_userServices.GetUserByStaffcode(staffcode));
        }

        [HttpPut("edit")]
        public IActionResult UpdateInfoUser(UserUpdateRequest userUpdateRequest)
        {
            try
            {
                _userServices.UpdateInformation(userUpdateRequest);
                return Ok(Messages.UPDATE_USER_SUCCESS);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("create")]
        public IActionResult CreateNewUser(UserCreationRequest userCreationRequest)
        {
            try
            {
                _userServices.Create(userCreationRequest);
                return Ok(Messages.CREATE_USER_SUCCESS);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPut("disable")]
        public IActionResult DisableUser(string staffcode)
        {
            var check = _assignmentService.GetAssignmentByStaffcode(staffcode);
            if (check.Count() > 0)
            {
                return BadRequest("This user has assignment(s)");
            }
            else
            {
                _userServices.DisableUser(staffcode);
                return Ok("Disable successfull");
            }
        }

        [HttpGet("check-valid-disable")]
        public ActionResult<bool> CheckValidDisableUser(string staffcode)
        {
            var check = _assignmentService.GetAssignmentByStaffcode(staffcode);
            if (check.Count() > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
 

    }
}
