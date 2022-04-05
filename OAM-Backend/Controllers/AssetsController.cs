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
    [Route("api/assets")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly IAssetService _assetService;
        private readonly IAssignmentService _assignmentService;
        public AssetsController(IAssetService assetService, IAssignmentService assignmentService)
        {
            _assetService = assetService;
            _assignmentService = assignmentService;
        }

        [HttpGet("list")]
        public IActionResult GetAssets([FromQuery] PageAction pageAction, string location, int status, int categoryid)
        {
            return Ok(_assetService.GetAll(pageAction, location, status, categoryid));
        }

        [HttpGet("detail/{assetCode}")]
        public ActionResult GetAsset(string assetCode)
        {
            return Ok(_assetService.GetAsset(assetCode));
        }

        [HttpGet("CheckValidDeleteAsset")]
        public ActionResult<bool> CheckValidDeleteAsset(string assetCode)
        {
            var check = _assignmentService.GetAssignmentByAssetCode(assetCode);
            if (check.Count() > 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }

        [HttpDelete("delete")]
        public void Delete(string code)
        {
            _assetService.Delete(code);
        }

        [HttpPost("create")]
        public ActionResult PostAsset(AssetRequestToCreate assetRequest)
        {
            if (_assetService.Create(assetRequest) != null)
            {
                return Ok("Add successfull");
            }
            return BadRequest();
        }

        [HttpPut("edit/{assetCode}")]
        public ActionResult PutAsset(string assetCode, AssetRequestToEdit assetRequest)
        {
            if (_assetService.Update(assetCode, assetRequest) != null)
            {
                return Ok("Edit successfull");
            }
            return BadRequest();
        }
        [HttpGet]
        [Route("get-assets")]
        public ActionResult<List<Asset>> GetAssets()
        {
            return Ok(_assetService.GetAssets());
        }

        [HttpGet]
        [Route("get-assets-available")]
        public IActionResult GetAvailableAsset(string location)
        {
            return Ok(_assetService.GetAvailableAssets(location));
        }

    }
}
