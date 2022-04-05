using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OAM_Backend.Models.Responses
{
    public class CategoryResponse
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Prefix { get; set; }
    }
}