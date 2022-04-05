using OAM_Backend.Models;

namespace OAM_Backend.Helpers
{
    public interface IJwtUtils
    {
        public string GenerateToken(User user);
        public string? ValidateToken(string token);
    }
}
