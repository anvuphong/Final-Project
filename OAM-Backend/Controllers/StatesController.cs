#nullable disable
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

namespace OAM_Backend.Controllers
{
    [Authorize]
    [Route("api/states")]
    [ApiController]
    public class StatesController : ControllerBase
    {

        private readonly IStateService _stateService;

        public StatesController(IStateService stateService)
        {
            _stateService = stateService;
        }

        [HttpGet("list")]
        public ActionResult<List<AssetState>> GetState()
        {
            return Ok(_stateService.GetAllState());
        }

        [HttpGet("list/id/{id}")]
        public ActionResult GetState(int id)
        {
            return Ok(_stateService.GetState(id));
        }

    }
}
