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
using OAM_Backend.Models.Requests;

namespace OAM_Backend.Controllers
{
    [Authorize]
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        // GET: api/categories/list
        [HttpGet("list/page-response")]
        public IActionResult GetCategories([FromQuery] PageAction pageAction)
        {
            return Ok(_categoryService.GetAll(pageAction));
        }

        [HttpGet("{id}")]
        public IActionResult GetCategory(int id)
        {
            return Ok(_categoryService.GetCategory(id));
        }

        // POST: api/categories/create
        [HttpPost("create")]
        public IActionResult PostCategory(CategoryRequest categoryRequest)
        {
            if (_categoryService.Create(categoryRequest) != null)
            {
                return Ok("Add successfull");
            }
            return BadRequest();
        }

        [HttpGet("list")]
        public IActionResult ListAllCategories()
        {
            return Ok(_categoryService.ListAllCategories());
        }


    }
}
