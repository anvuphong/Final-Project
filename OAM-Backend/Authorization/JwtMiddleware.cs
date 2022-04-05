using OAM_Backend.Helpers;
using OAM_Backend.Services;

namespace OAM_Backend.Authorization
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IUserService userServices, IJwtUtils jwtUtils)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var staffCode = jwtUtils.ValidateToken(token);
            if (staffCode != null)
            {
                // attach user to context on successful jwt validation
                context.Items["User"] = userServices.GetUserByStaffcode(staffCode);
            }

            await _next(context);
        }
    }
}
