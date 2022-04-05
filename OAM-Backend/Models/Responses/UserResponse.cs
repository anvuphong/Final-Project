using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OAM_Backend.Models.Responses
{
    public class UserResponse
    {
        public string Staffcode { get; set; }
        public string FullName { get; set; }
        public bool IsAdmin { get; set; }
    }
}