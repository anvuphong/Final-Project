using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OAM_Backend.Authorization;
using OAM_Backend.Constants;
using OAM_Backend.Models.Requests;
using OAM_Backend.Services;

namespace OAM_Backend.Controllers
{
    [Authorize]
    [Route("api/authentications")]
    [ApiController]
    public class AuthenticationsController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthenticationsController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Authenticate(AuthenticateRequest authenticateRequestModel)
        {
            try
            {
                return Ok(_userService.Authenticate(authenticateRequestModel));
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("password/first")]
        public IActionResult ChangePasswordOnFirstTime(UserFirstChangePasswordRequest userFirstChangePasswordRequest)
        {
            try
            {
                _userService.ChangePasswordOnFirstTime(userFirstChangePasswordRequest);
                return Ok(Messages.CHANGE_PASSWORD_SUCCESS);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("password/manual")]
        public IActionResult ChangePasswordManual(UserChangePasswordManualRequest userChangePasswordManualRequest)
        {
            try
            {
                _userService.ChangePasswordManual(userChangePasswordManualRequest);
                return Ok(Messages.CHANGE_PASSWORD_SUCCESS);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
